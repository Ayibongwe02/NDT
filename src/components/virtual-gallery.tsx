import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Artwork } from "@/lib/museum-data";
import { ARTWORKS } from "@/lib/museum-data";
import { cn } from "@/lib/utils";

type Selected = Artwork | null;

/**
 * Client-only Three.js gallery hall. Artworks hang on the long walls;
 * orbit to look around, click a frame to open its label. Loaded dynamically
 * so SSR never touches WebGL.
 */
export function VirtualGallery() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Selected>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const selectedRef = useRef<Selected>(null);
  selectedRef.current = selected;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let renderer: import("three").WebGLRenderer | null = null;
    let animId = 0;
    let controls: { dispose: () => void; update: () => void } | null = null;
    let onResize: (() => void) | null = null;
    let onClick: ((e: PointerEvent) => void) | null = null;

    (async () => {
      try {
        const THREE = await import("three");
        const { OrbitControls } = await import(
          "three/examples/jsm/controls/OrbitControls.js"
        );

        if (disposed || !mountRef.current) return;
        const el = mountRef.current;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1a1412);
        scene.fog = new THREE.Fog(0x1a1412, 22, 52);

        const camera = new THREE.PerspectiveCamera(
          55,
          el.clientWidth / Math.max(el.clientHeight, 1),
          0.1,
          100,
        );
        camera.position.set(0, 1.65, 8);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(el.clientWidth, el.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        el.appendChild(renderer.domElement);

        // Room dimensions — long enough for community + museum hangings
        const W = 14;
        const H = 4.2;
        const D = 28;
        const wallMat = new THREE.MeshStandardMaterial({
          color: 0xf2ebe0,
          roughness: 0.92,
          metalness: 0.02,
        });
        const floorMat = new THREE.MeshStandardMaterial({
          color: 0x3a2e28,
          roughness: 0.75,
          metalness: 0.05,
        });
        const ceilMat = new THREE.MeshStandardMaterial({
          color: 0xe8dfd0,
          roughness: 1,
        });

        const floor = new THREE.Mesh(
          new THREE.PlaneGeometry(W, D),
          floorMat,
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);

        const ceiling = new THREE.Mesh(
          new THREE.PlaneGeometry(W, D),
          ceilMat,
        );
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = H;
        scene.add(ceiling);

        // Long walls (left / right)
        const wallL = new THREE.Mesh(
          new THREE.PlaneGeometry(D, H),
          wallMat,
        );
        wallL.rotation.y = Math.PI / 2;
        wallL.position.set(-W / 2, H / 2, 0);
        wallL.receiveShadow = true;
        scene.add(wallL);

        const wallR = new THREE.Mesh(
          new THREE.PlaneGeometry(D, H),
          wallMat,
        );
        wallR.rotation.y = -Math.PI / 2;
        wallR.position.set(W / 2, H / 2, 0);
        wallR.receiveShadow = true;
        scene.add(wallR);

        // End walls
        const wallF = new THREE.Mesh(
          new THREE.PlaneGeometry(W, H),
          wallMat,
        );
        wallF.position.set(0, H / 2, -D / 2);
        wallF.receiveShadow = true;
        scene.add(wallF);

        const wallB = new THREE.Mesh(
          new THREE.PlaneGeometry(W, H),
          wallMat,
        );
        wallB.rotation.y = Math.PI;
        wallB.position.set(0, H / 2, D / 2);
        wallB.receiveShadow = true;
        scene.add(wallB);

        // Soft gallery lights
        scene.add(new THREE.AmbientLight(0xfff5e8, 0.45));
        const hemi = new THREE.HemisphereLight(0xfff8ee, 0x3a2e28, 0.55);
        scene.add(hemi);

        const spots: import("three").SpotLight[] = [];
        for (const z of [-10, -4, 2, 8]) {
          for (const x of [-W / 2 + 0.4, W / 2 - 0.4]) {
            const spot = new THREE.SpotLight(0xfff0d8, 12, 16, 0.55, 0.4, 1.2);
            spot.position.set(x * 0.15, H - 0.3, z);
            spot.target.position.set(x > 0 ? W / 2 - 0.15 : -W / 2 + 0.15, 1.6, z);
            spot.castShadow = true;
            spot.shadow.mapSize.set(512, 512);
            scene.add(spot);
            scene.add(spot.target);
            spots.push(spot);
          }
        }

        // Gold accent strip along baseboards
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0xc4a35a,
          roughness: 0.45,
          metalness: 0.35,
        });
        for (const x of [-W / 2 + 0.02, W / 2 - 0.02]) {
          const base = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 0.12, D - 0.2),
            baseMat,
          );
          base.position.set(x, 0.06, 0);
          scene.add(base);
        }

        const loader = new THREE.TextureLoader();
        const pickables: import("three").Object3D[] = [];
        const frameMat = new THREE.MeshStandardMaterial({
          color: 0x2a1c16,
          roughness: 0.55,
          metalness: 0.15,
        });
        const matGold = new THREE.MeshStandardMaterial({
          color: 0xc4a35a,
          roughness: 0.4,
          metalness: 0.5,
        });

        // Hang works alternating left / right walls along the hall
        const nSlots = Math.max(Math.ceil(ARTWORKS.length / 2), 1);
        const zSpan = D - 8;
        const zStart = -zSpan / 2;
        const zStep = nSlots > 1 ? zSpan / (nSlots - 1) : 0;
        const placements = ARTWORKS.map((work, i) => {
          const side = i % 2 === 0 ? -1 : 1;
          const slot = Math.floor(i / 2);
          const z = zStart + slot * zStep;
          return { work, side, z };
        });

        await Promise.all(
          placements.map(async ({ work, side, z }) => {
            const tex = await new Promise<import("three").Texture>(
              (resolve, reject) => {
                loader.load(
                  work.image,
                  (t) => {
                    t.colorSpace = THREE.SRGBColorSpace;
                    resolve(t);
                  },
                  undefined,
                  reject,
                );
              },
            );
            if (disposed) return;

            const aspect =
              (tex.image as HTMLImageElement).width /
              Math.max((tex.image as HTMLImageElement).height, 1);
            const artH = 1.55;
            const artW = artH * Math.min(aspect, 1.45);

            const group = new THREE.Group();
            group.userData.artwork = work;

            // Outer frame
            const outer = new THREE.Mesh(
              new THREE.BoxGeometry(artW + 0.16, artH + 0.16, 0.06),
              frameMat,
            );
            outer.position.z = 0.03;
            outer.castShadow = true;
            group.add(outer);

            // Gold inner lip
            const lip = new THREE.Mesh(
              new THREE.BoxGeometry(artW + 0.08, artH + 0.08, 0.04),
              matGold,
            );
            lip.position.z = 0.05;
            group.add(lip);

            // Canvas
            const canvas = new THREE.Mesh(
              new THREE.PlaneGeometry(artW, artH),
              new THREE.MeshStandardMaterial({
                map: tex,
                roughness: 0.85,
                metalness: 0,
              }),
            );
            canvas.position.z = 0.072;
            canvas.userData.artwork = work;
            canvas.userData.isArt = true;
            group.add(canvas);
            pickables.push(canvas);

            // Wall plaque under the frame
            const plaque = new THREE.Mesh(
              new THREE.BoxGeometry(artW * 0.7, 0.08, 0.02),
              frameMat,
            );
            plaque.position.set(0, -artH / 2 - 0.22, 0.04);
            group.add(plaque);

            group.position.set(
              side * (W / 2 - 0.08),
              1.55,
              z,
            );
            group.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
            scene.add(group);
          }),
        );

        if (disposed) return;

        // Title plaque on far wall
        const titleCanvas = document.createElement("canvas");
        titleCanvas.width = 1024;
        titleCanvas.height = 256;
        const ctx = titleCanvas.getContext("2d")!;
        ctx.fillStyle = "#1c1412";
        ctx.fillRect(0, 0, 1024, 256);
        ctx.fillStyle = "#c4a35a";
        ctx.font = "600 42px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText("CODE COMMUNITY MUSEUM", 512, 110);
        ctx.fillStyle = "#c4a35a";
        ctx.font = "400 22px system-ui, sans-serif";
        ctx.fillText("Virtual Gallery · Hatfield Campus", 512, 175);
        const titleTex = new THREE.CanvasTexture(titleCanvas);
        titleTex.colorSpace = THREE.SRGBColorSpace;
        const titlePlane = new THREE.Mesh(
          new THREE.PlaneGeometry(4.2, 1.05),
          new THREE.MeshStandardMaterial({ map: titleTex, roughness: 0.9 }),
        );
        titlePlane.position.set(0, 2.4, -D / 2 + 0.05);
        scene.add(titlePlane);

        const orbit = new OrbitControls(camera, renderer.domElement);
        orbit.enableDamping = true;
        orbit.dampingFactor = 0.08;
        orbit.minDistance = 2.5;
        orbit.maxDistance = 18;
        orbit.maxPolarAngle = Math.PI * 0.48;
        orbit.minPolarAngle = 0.2;
        orbit.target.set(0, 1.4, 0);
        orbit.update();
        controls = orbit;

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        onClick = (e: PointerEvent) => {
          const rect = renderer!.domElement.getBoundingClientRect();
          pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          raycaster.setFromCamera(pointer, camera);
          const hits = raycaster.intersectObjects(pickables, false);
          if (hits.length > 0) {
            const art = hits[0].object.userData.artwork as Artwork | undefined;
            if (art) setSelected(art);
          } else {
            setSelected(null);
          }
        };
        renderer.domElement.addEventListener("pointerup", onClick);

        onResize = () => {
          if (!renderer || !mountRef.current) return;
          const w = mountRef.current.clientWidth;
          const h = Math.max(mountRef.current.clientHeight, 1);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        const tick = () => {
          if (disposed) return;
          animId = requestAnimationFrame(tick);
          orbit.update();
          renderer!.render(scene, camera);
        };
        tick();
        setReady(true);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "WebGL gallery failed to load",
        );
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(animId);
      if (onResize) window.removeEventListener("resize", onResize);
      if (renderer && onClick) {
        renderer.domElement.removeEventListener("pointerup", onClick);
      }
      controls?.dispose();
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentElement) {
          renderer.domElement.parentElement.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="relative flex h-[min(78vh,720px)] min-h-[420px] w-full flex-col overflow-hidden rounded-xl border border-border bg-hero shadow-[0_8px_40px_rgba(28,20,18,0.18)]">
      <div ref={mountRef} className="absolute inset-0" />

      {!ready && !error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-hero/90 text-hero-fg">
          <p className="font-serif text-lg tracking-wide">Opening the hall…</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-hero p-6 text-center text-hero-fg">
          <p className="max-w-sm text-sm text-hero-fg/85">
            3D gallery needs WebGL. {error}
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute top-3 left-3 z-20 rounded-full bg-black/45 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur-sm sm:text-xs">
        Drag to look · Scroll to zoom · Click a work
      </div>

      {selected && (
        <div
          className={cn(
            "absolute right-3 bottom-3 left-3 z-20 max-w-md rounded-2xl border border-white/15 bg-black/70 p-4 text-white shadow-xl backdrop-blur-md sm:left-auto sm:w-80",
          )}
        >
          <p className="text-[10px] font-semibold tracking-[0.16em] text-gold">
            {selected.collection.toUpperCase()}
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold leading-tight">
            {selected.title}
          </h3>
          <p className="mt-0.5 text-sm text-white/70">
            {selected.artist} · {selected.year}
          </p>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/85">
            {selected.desc}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <Link
              to="/work/$id"
              params={{ id: selected.id }}
              className="pointer-events-auto rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-surface no-underline hover:bg-primary-dark"
            >
              Open detail
            </Link>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="pointer-events-auto rounded-md px-2 py-1.5 text-xs text-white/70 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
