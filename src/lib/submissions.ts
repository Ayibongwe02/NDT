import { create } from "zustand";

export type Submission = {
  id: string;
  title: string;
  medium: string;
  year: number;
  dimensions: string;
  collection: string;
  reviewPath: "digital" | "physical";
  status: "submitted" | "under_review" | "decision" | "published";
  createdAt: string;
};

type Store = {
  items: Submission[];
  add: (s: Omit<Submission, "id" | "status" | "createdAt">) => Submission;
};

export const useSubmissions = create<Store>()((set, get) => ({
  items: [],
  add: (s) => {
    const entry: Submission = {
      ...s,
      id: `sub-${Date.now()}`,
      status: "under_review",
      createdAt: new Date().toISOString(),
    };
    set({ items: [...get().items, entry] });
    return entry;
  },
}));
