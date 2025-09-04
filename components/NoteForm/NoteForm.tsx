'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import { useNoteDraftStore } from '@/lib/store/noteStore';

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const [title, setTitle] = useState(draft.title);
  const [content, setContent] = useState(draft.content);
  const [tag, setTag] = useState(draft.tag);
  const [error, setError] = useState('');


  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 3 || title.length > 50) {
      setError('Title must be between 3 and 50 characters.');
      return;
    }

    if (content.length > 500) {
      setError('Content must be less than 500 characters.');
      return;
    }

    try {
      await createNote({ title, content, tag });
      clearDraft(); 
      router.back(); 
    } catch (err) {
      console.error(err);
      setError('Failed to create note.');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      {error && <p className={css.error}>{error}</p>}

      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
