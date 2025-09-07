import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; 
  const note = await fetchNoteById(id);
   

  return {
    title: note?.title ? `${note.title} | NoteHub` : 'Note details | NoteHub',
    description:
      note?.description ?? 'Browse and organize all your notes in NoteHub.',
  };
}

export default async function NotePage(rawProps: { params: { id: string } }) {

  const props: Props = {
    params: Promise.resolve(rawProps.params),
  };

  const { id } = await props.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });
  const note = await fetchNoteById(id);


  return (
    <QueryClientProvider client={queryClient}>
      <NoteDetailsClient note={note} />
    </QueryClientProvider>
  );
}
