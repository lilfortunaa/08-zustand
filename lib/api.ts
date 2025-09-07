import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;



const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  perPage: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search) params.search = search;
  if (tag && tag !== 'All') params.tag = tag; 

  if (!token) throw new Error('Authorization token is missing');

  const res: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params,
  });

  return {
    ...res.data,
    page,
    perPage,
  };
};

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.post('/notes', note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  console.log("fetchNoteById response:", res.data);
  return res.data;
};
