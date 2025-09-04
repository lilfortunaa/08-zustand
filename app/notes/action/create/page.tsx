import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Use this page to create a new note in NoteHub.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Quickly create a new note in NoteHub.',
    url: '/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 425,
        height: 283,
        alt: 'NoteHub Preview',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
