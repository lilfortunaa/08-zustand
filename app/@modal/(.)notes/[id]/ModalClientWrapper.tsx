'use client';
import { Note } from '@/types/note';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

interface Props {
  note: Note;
}

export default function ModalClientWrapper({ note }: Props) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetailsClient note={note} />
    </Modal>
  );
}
