'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import NoteModalClient from '../../app/@modal/(.)notes/[id]/NoteModalClient';

interface Props {
  noteId: string;
}

export default function NoteModalHydrate({ noteId }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NoteModalClient noteId={noteId} />
    </QueryClientProvider>
  );
}
