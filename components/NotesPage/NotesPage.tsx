import Link from 'next/link';
import { Note } from '@/types/note';
import { NoteTag } from '@/types/note';

interface NotesPageProps {
  notes: Note[];
}

export default function NotesPage({ notes }: NotesPageProps) {
  const uniqueTags: (NoteTag | 'All')[] = Array.from(
    new Set(notes.map(note => note.tag))
  );
  uniqueTags.unshift('All');

  return (
    <div>
      <h1>All Notes Categories</h1>
      <ul>
        {uniqueTags.map(tag => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>

      <h2>Recent Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
