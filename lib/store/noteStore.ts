import { create } from 'zustand';
import {persist} from 'zustand/middleware';


export type Draft = {
  title: string;
  content: string;
  tag: string;
};

type NoteDraftStore = {
  draft: Draft
  setDraft: (note: Draft) => void;
  clearDraft: () => void;
};

const initialDraft:Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(persist ((set)=>({
    draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}),
{
    name:'note-draft',
}));