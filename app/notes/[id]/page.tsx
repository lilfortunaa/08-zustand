import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Metadata} from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props):Promise<Metadata> {
const { id } = await params
  const note = await fetchNoteById(id)
  
    const pageTitle = note?.title
    ? `${note.title} | NoteHub`
      : 'Note details | NoteHub';
  
    const pageDescription = note?.description
      ? note.description
      : 'Browse and organize all your notes in NoteHub.';
  
    return {
      title: pageTitle,
      description: pageDescription,
      openGraph: {
      title: pageTitle,
      description:pageDescription,
      url:`/notes/${id}`,
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 425,
        height:283,
        alt:'NoteHub Preview',
      }]
    }
    }
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();
  const note = await fetchNoteById(id); 

  return (
    <QueryClientProvider client={queryClient}>
      <NoteDetailsClient note={note} />
    </QueryClientProvider>
  );
}
