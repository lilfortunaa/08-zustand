'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './TagsMenu.module.css';
import { NoteTag } from '@/types/note';

const tags: (NoteTag | 'All')[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={styles.menuContainer}>
      <button 
        className={styles.menuButton} 
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={styles.menuList}>
          {tags.map(tag => (
            <li key={tag} className={styles.menuItem}>
              <Link 
                href={`/notes/filter/${tag}`} 
                className={styles.menuLink}
                onClick={closeMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
