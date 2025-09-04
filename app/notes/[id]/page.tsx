import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  const note = await fetchNoteById(id); // получаем объект note

  return (
    <QueryClientProvider client={queryClient}>
      <NoteDetailsClient note={note} /> {/* передаём note, а не noteId */}
    </QueryClientProvider>
  );
}
