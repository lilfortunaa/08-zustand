'use client';

import { Note } from '@/types/note';
import css from '../../../components/NoteDetails/NoteDetails.module.css';


interface NoteDetailsClientProps {
  note: Note;
}

export default function NoteDetailsClient({ note }: NoteDetailsClientProps) {
  if (!note) return <p>Something went wrong.</p>;


  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          {note.tag && <span className={css.tag}>{note.tag}</span>}
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
