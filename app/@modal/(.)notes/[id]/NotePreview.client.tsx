'use client';
import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface NotePreviewProps {
  noteId: string;
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();
  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const closeModal = () => router.back();

  return (
    <Modal onClose={closeModal}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading note. Please try again.</p>}
      {!isLoading && !isError && note && (
        <div>
          <button onClick={closeModal} style={{ float: 'right' }}>Close</button>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p><strong>Tag:</strong> {note.tag}</p>
          <p><strong>Created At:</strong> {new Date(note.createdAt).toLocaleString()}</p>
        </div>
      )}
    </Modal>
  );
}
