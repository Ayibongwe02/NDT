export type CollectionName =
  | "Community Voices"
  | "Mapungubwe Gold"
  | "Highveld Light"
  | "Sculpture & Form"
  | "Narrative Interiors"
  | "Ceramic Traditions";

export type HistoricRef = {
  name: string;
  years: string;
  note: string;
};

export type Artwork = {
  id: string;
  title: string;
  artist: string;
  loc: string;
  year: number;
  medium: string;
  dim: string;
  collection: CollectionName;
  desc: string;
  historic: HistoricRef;
  image: string;
};

export type Collection = {
  name: CollectionName;
  slug: string;
  desc: string;
  gallery: string;
};

export const COLLECTIONS: Collection[] = [
  {
    name: "Community Voices",
    slug: "community-voices",
    desc: "Paintings by community artists across South Africa — township, rural, and backyard life",
    gallery: "Community Hall · Code Community Museum",
  },
  {
    name: "Mapungubwe Gold",
    slug: "mapungubwe-gold",
    desc: "Gold, trade glass, and the first southern African kingdom",
    gallery: "Mapungubwe Gallery · Old Arts",
  },
  {
    name: "Highveld Light",
    slug: "highveld-light",
    desc: "Wide sky, koppies, and the pale weather of Gauteng",
    gallery: "Old Arts Building",
  },
  {
    name: "Sculpture & Form",
    slug: "sculpture-form",
    desc: "Bronze, granite, and the Villa–van Wouw lineage",
    gallery: "Villa Gallery · Old Merensky",
  },
  {
    name: "Narrative Interiors",
    slug: "narrative-interiors",
    desc: "Figures, rooms, and psychological space",
    gallery: "Central wing · Old Arts",
  },
  {
    name: "Ceramic Traditions",
    slug: "ceramic-traditions",
    desc: "Chinese porcelain, Delft, and African studio ware",
    gallery: "Van Tilburg Collection",
  },
];

export const ARTWORKS: Artwork[] = [
  {
    id: "ndebele-wall",
    title: "Ndebele Wall, Middelburg",
    artist: "Nomsa Mabena",
    loc: "Middelburg, Mpumalanga",
    year: 2024,
    medium: "Acrylic on canvas",
    dim: "90 × 120 cm",
    collection: "Community Voices",
    desc: "A homestead facade in full Ndebele geometry — stepped lines, triangles, and electric colour — with the painter herself standing in the Highveld grass, brush in hand.",
    historic: {
      name: "Esther Mahlangu",
      years: "b. 1935",
      note: "Mahlangu brought Ndebele mural painting from homestead walls onto canvas and the world stage, keeping a community women’s tradition visible without emptying it of its home.",
    },
    image: "/works/ndebele.jpg",
  },
  {
    id: "saturday-orlando",
    title: "Saturday in Orlando",
    artist: "Thabo Nkosi",
    loc: "Orlando East, Soweto",
    year: 2025,
    medium: "Oil on canvas",
    dim: "100 × 130 cm",
    collection: "Community Voices",
    desc: "A Saturday market in Soweto: fruit stalls, a turquoise spaza, washing between matchbox houses, and children with a soccer ball in late Highveld light.",
    historic: {
      name: "Durant Sihlali",
      years: "1935 – 2004",
      note: "Sihlali documented township streets, yards, and markets with a quiet fidelity that treated everyday Black urban life as a subject worthy of oil paint.",
    },
    image: "/works/soweto-saturday.jpg",
  },
  {
    id: "rondavels-rain",
    title: "Rondavels After Rain",
    artist: "Zanele Peyi",
    loc: "Qunu, Eastern Cape",
    year: 2023,
    medium: "Oil on board",
    dim: "80 × 110 cm",
    collection: "Community Voices",
    desc: "Thatched rondavels on a green hillside, aloes in bloom, cattle on a dirt path, and thunderheads over the Drakensberg foothills after afternoon rain.",
    historic: {
      name: "George Pemba",
      years: "1912 – 2001",
      note: "Pemba, working from Port Elizabeth, painted Eastern Cape rural and urban Black life with a warmth and narrative clarity that still trains the community eye.",
    },
    image: "/works/rondavels.jpg",
  },
  {
    id: "backyard-tuesday",
    title: "Backyard on a Tuesday",
    artist: "Lindiwe Petersen",
    loc: "Mitchells Plain, Cape Town",
    year: 2025,
    medium: "Oil on canvas",
    dim: "90 × 120 cm",
    collection: "Community Voices",
    desc: "A Cape Flats backyard: a grandmother in a plastic chair under a grapevine, a child and a soccer ball, washing on the line, Table Mountain a pale ghost on the horizon.",
    historic: {
      name: "Community Arts Project (CAP)",
      years: "1977 – 2008",
      note: "CAP in Woodstock trained community painters to picture District Six, the Cape Flats, and ordinary rooms as political and tender subjects — a school more than a style.",
    },
    image: "/works/cape-flats.jpg",
  },
  {
    id: "rank-at-four",
    title: "Rank at Four",
    artist: "Kagiso Molefe",
    loc: "Johannesburg",
    year: 2024,
    medium: "Acrylic on canvas",
    dim: "110 × 140 cm",
    collection: "Community Voices",
    desc: "A Johannesburg taxi rank at the four-o’clock crush: striped minibus taxis, school uniforms, vendors under yellow umbrellas, winter Highveld light on chrome and dust.",
    historic: {
      name: "Gerard Sekoto",
      years: "1913 – 1993",
      note: "Sekoto’s Sophiatown and Eastwood street scenes established the urban crowd, the bus, and the yellow light of the Highveld as a South African painting language.",
    },
    image: "/works/taxi-rank.jpg",
  },
  {
    id: "painting-the-wall",
    title: "Painting the Wall Together",
    artist: "Amina Sithole",
    loc: "Mamelodi, Pretoria",
    year: 2026,
    medium: "Oil on canvas",
    dim: "100 × 135 cm",
    collection: "Community Voices",
    desc: "A community mural workshop in Mamelodi: neighbours of every age covering a wall with doves, sunflowers, and a township street, buckets of colour at their feet.",
    historic: {
      name: "Thami Mnyele & Medu Art Ensemble",
      years: "1979 – 1985",
      note: "Medu, in exile in Gaborone, treated the mural and the poster as community work — art made with people, not only for them. This hanging continues that ethic on Hatfield’s doorstep.",
    },
    image: "/works/mural-workshop.jpg",
  },
  {
    id: "golden-rhino",
    title: "Golden Horizon Rhino",
    artist: "Elena Voss",
    loc: "Cape Town / Pretoria",
    year: 2024,
    medium: "Gold leaf on bronze",
    dim: "18 × 32 × 12 cm",
    collection: "Mapungubwe Gold",
    desc: "A contemporary meditation on Mapungubwe’s goldwork: compact mass, reflected light, and the animal as state symbol.",
    historic: {
      name: "Mapungubwe goldsmiths",
      years: "c. 1220 – 1290",
      note: "The gold rhino, sceptre and bowl from Mapungubwe Hill remain among southern Africa’s most important archaeological finds, stewarded by the University of Pretoria Museums.",
    },
    image: "/works/rhino.jpg",
  },
  {
    id: "silent-drift",
    title: "Highveld After Rain",
    artist: "Marcus Chen",
    loc: "Pretoria",
    year: 2023,
    medium: "Oil on linen",
    dim: "90 × 120 cm",
    collection: "Highveld Light",
    desc: "Wet earth and a washed Highveld sky after a late-afternoon storm, looking toward distant koppies.",
    historic: {
      name: "J.H. Pierneef",
      years: "1886 – 1957",
      note: "Pierneef’s monumental Highveld compositions established the geometric sky and koppie as a South African visual language still taught on this campus.",
    },
    image: "/works/highveld.jpg",
  },
  {
    id: "field-no-7",
    title: "Vertical Construction VII",
    artist: "Amina Okoro",
    loc: "Lagos / Johannesburg",
    year: 2025,
    medium: "Patinaed bronze",
    dim: "210 × 70 × 55 cm",
    collection: "Sculpture & Form",
    desc: "Intersecting planes in tension, made for courtyard light — a conversation with the Villa Gallery’s vertical bronzes.",
    historic: {
      name: "Edoardo Villa",
      years: "1915 – 2011",
      note: "Italian-born Villa donated a substantial body of sculpture to the University. The Villa Gallery in the Old Merensky Building remains the principal home of that gift.",
    },
    image: "/works/sculpture.jpg",
  },
  {
    id: "waiting-room",
    title: "The Waiting Room, Hatfield",
    artist: "Sofia Reyes",
    loc: "Mexico City / Pretoria",
    year: 2024,
    medium: "Oil on canvas",
    dim: "100 × 140 cm",
    collection: "Narrative Interiors",
    desc: "Two figures in a sunlit university interior, caught between departure and lingering.",
    historic: {
      name: "Edward Hopper",
      years: "1882 – 1967",
      note: "Hopper’s staged light and solitary figures remain the reference for quiet narrative space; this work continues that tradition under Highveld sun.",
    },
    image: "/works/waiting.jpg",
  },
  {
    id: "tide-line",
    title: "Blue-and-White, Kangxi Light",
    artist: "Jonah Berg",
    loc: "Reykjavik / Pretoria",
    year: 2023,
    medium: "Archival pigment print",
    dim: "50 × 70 cm",
    collection: "Ceramic Traditions",
    desc: "A still life of underglaze blue porcelain and a Delft fragment, photographed in the manner of the Van Tilburg galleries.",
    historic: {
      name: "J.A. van Tilburg",
      years: "bequest 1976",
      note: "Van Tilburg’s gift includes one of the largest Chinese ceramic holdings in South Africa, with wares from Han through Qing, plus Delft and furniture now shown in Old Arts.",
    },
    image: "/works/porcelain.jpg",
  },
  {
    id: "pac-monument-mamelodi",
    title: "PAC Monument, Mamelodi",
    artist: "Community Photographers of Tshwane",
    loc: "Mamelodi, Pretoria",
    year: 2025,
    medium: "Documentary photograph",
    dim: "Digital",
    collection: "Community Voices",
    desc: "A stone cairn dedicated to the past presidents of the Pan Africanist Congress of Azania. The black plaque carries the names of Robert Mangaliso Sobukwe (05.04.1924 – 27.02.1978) and Zephania Lekoama Mothopeng (11.09.1913 – 23.10.1990), together with a raised hand and the founding declaration: “We stand for the government of the Africans, by the Africans, for the Africans, with everybody who owes his only loyalty to Africa and accepts the democratic rule of an African majority, being regarded as an African.” Under Highveld sun and thorn trees, the monument keeps the memory of struggle leadership alive in the place where people still live.",
    historic: {
      name: "Robert Sobukwe & Zephania Mothopeng",
      years: "PAC leadership",
      note: "Sobukwe and Mothopeng embodied the PAC’s Africanist vision. Memorials like this one in Mamelodi turn political history into living community ground — places where residents, school groups and visitors can still stand with the names and the words.",
    },
    image: "/works/pac-monument.jpg",
  },
  {
    id: "mamelodi-street-view",
    title: "Street View, Mamelodi East",
    artist: "Community Photographers of Tshwane",
    loc: "Mamelodi, Pretoria",
    year: 2025,
    medium: "Documentary photograph",
    dim: "Digital",
    collection: "Community Voices",
    desc: "A dirt road drops between corrugated zinc and brick houses toward the industrial edge of the city. Red bakkie, green sheeting, satellite dishes, washing lines and the long view over factories and koppies — the everyday texture of a township street that has carried generations of work, music, resistance and ordinary life.",
    historic: {
      name: "Township documentary tradition",
      years: "1970s – present",
      note: "From the struggle photographers of the 1980s to today’s community storytellers, images of Mamelodi’s streets refuse to treat the place as backdrop. They insist that the road, the shack and the view over the city are subjects in their own right.",
    },
    image: "/works/mamelodi-street.jpg",
  },
  {
    id: "mamelodi-victims-wall",
    title: "Mamelodi Victims of Conflict Memorial Wall",
    artist: "City of Tshwane Heritage / Community",
    loc: "Mamelodi, Pretoria",
    year: 2024,
    medium: "Mosaic and plaque",
    dim: "Site-specific",
    collection: "Community Voices",
    desc: "A black information plaque stands before a vivid mosaic wall of yellow, red and terracotta tiles. It reads: “Mamelodi Victims of Conflict — This Memorial Wall provides a space to remember the victims of conflict in Mamelodi. More names will be added as new candidates are presented and verified.” Public submissions are invited via the City of Tshwane Heritage Department. The wall turns grief and resistance into a living, still-growing public artwork.",
    historic: {
      name: "Mamelodi conflict memory",
      years: "1980s – ongoing",
      note: "Mamelodi was a major site of resistance and state violence in the 1980s. Memorial walls like this one keep the names and the stories of those who died in the conflict present for new generations, and leave space for more names still to be verified and added.",
    },
    image: "/works/mamelodi-memorial-wall.jpg",
  },
];

export const COMMUNITY_WORKS = ARTWORKS.filter(
  (a) => a.collection === "Community Voices",
);

export const MUSEUM_WORKS = ARTWORKS.filter(
  (a) => a.collection !== "Community Voices",
);

export function artworkById(id: string) {
  return ARTWORKS.find((a) => a.id === id);
}

export function artworksByCollection(name?: CollectionName | string | null) {
  if (!name) return ARTWORKS;
  return ARTWORKS.filter((a) => a.collection === name);
}

export const COLLECTION_KEYWORDS: Record<CollectionName, string[]> = {
  "Community Voices": [
    "community",
    "township",
    "mural",
    "ndebele",
    "soweto",
    "rondavel",
    "taxi",
    "backyard",
    "cape flats",
    "mamelodi",
  ],
  "Mapungubwe Gold": [
    "gold",
    "rhino",
    "mapungubwe",
    "kingdom",
    "trade",
    "bead",
    "iron",
    "hill",
  ],
  "Highveld Light": [
    "highveld",
    "landscape",
    "koppie",
    "sky",
    "jacaranda",
    "rain",
    "veld",
    "light",
  ],
  "Sculpture & Form": [
    "sculpture",
    "bronze",
    "form",
    "villa",
    "wouw",
    "abstract",
    "plane",
    "construction",
  ],
  "Narrative Interiors": [
    "interior",
    "figure",
    "waiting",
    "room",
    "portrait",
    "narrative",
    "hatfield",
    "scene",
  ],
  "Ceramic Traditions": [
    "ceramic",
    "porcelain",
    "delft",
    "bowl",
    "ming",
    "qing",
    "clay",
    "tile",
  ],
};

export function suggestCollection(title: string, medium = "", extra = "") {
  const text = `${title} ${medium} ${extra}`.toLowerCase();
  const scores = {} as Record<CollectionName, number>;
  for (const [name, keys] of Object.entries(COLLECTION_KEYWORDS) as [
    CollectionName,
    string[],
  ][]) {
    scores[name] = keys.reduce((n, kw) => n + (text.includes(kw) ? 1 : 0), 0);
  }
  const best = (Object.entries(scores) as [CollectionName, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0];
  const confidence =
    best[1] > 0 ? Math.min(0.95, 0.4 + best[1] * 0.15) : 0.28;
  return {
    suggested: best[1] > 0 ? best[0] : ("Community Voices" as CollectionName),
    confidence: Math.round(confidence * 100) / 100,
    scores,
    note: "Prototype keyword classifier trained on community and UP Museums collection vocabularies. Replace with a vision model on the object photograph for production.",
  };
}

export type CopyrightCheck = {
  status: "clear" | "review";
  label: string;
  matches: { title: string; source: string }[];
  note: string;
};

const KNOWN_WORKS_SAMPLE = [
  { title: "starry night", source: "MoMA collection (public domain)" },
  { title: "the scream", source: "Nasjonalgalleriet (public domain)" },
  { title: "girl with a pearl earring", source: "Mauritshuis (public domain)" },
  { title: "great wave", source: "Metropolitan Museum (public domain)" },
];

export function checkCopyrightRisk(title: string, extra = "") {
  const text = `${title} ${extra}`.toLowerCase();
  const match = KNOWN_WORKS_SAMPLE.find((w) => text.includes(w.title));
  const base: CopyrightCheck = match
    ? {
        status: "review",
        label: "Possible match — flagged for review",
        matches: [match],
        note: "Concept demo: this only matches on title text. A production check would run perceptual-hash / reverse-image-search matching on the uploaded photograph itself, plus a rights-holder database, before anything gets published.",
      }
    : {
        status: "clear",
        label: "No conflicts found in sample database",
        matches: [],
        note: "Concept demo: this only matches on title text and a tiny 4-work sample list — it does not inspect the actual image. A production version would hash the uploaded photograph and check it against real museum, stock-image, and rights-holder databases.",
      };
  return base;
}
