import Link from 'next/link';
import { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';

const tags: (NoteTag | 'All')[] = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

interface SidebarNotesProps {
  activeTag?: NoteTag | 'All';
}

export default function SidebarNotes({ activeTag }: SidebarNotesProps) {
  return (
    <nav className={css.sidebarNav} aria-label="Notes sidebar">
      <ul className={css.menuList}>
        <li className={css.menuHeader}><span>All notes</span></li>
        <li className={css.menuItem}>
          <Link
            href="/notes"
            aria-current={activeTag === 'All' ? 'page' : undefined}
            className={`${css.menuLink} ${activeTag === 'All' ? css.active : ''}`}
          >
            All
          </Link>
        </li>

        <li className={css.menuHeader}><span>Tags</span></li>
        {tags.filter(tag => tag !== 'All').map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              aria-current={activeTag === tag ? 'page' : undefined}
              className={`${css.menuLink} ${activeTag === tag ? css.active : ''}`}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
