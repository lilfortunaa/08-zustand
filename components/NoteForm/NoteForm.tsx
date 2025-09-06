'use client';

import { useRouter } from 'next/navigation';
import css from './NoteForm.module.css';
import { createNote } from '@/lib/api';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const { title, content, tag } = draft;

  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      clearDraft();
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
    onError: () => {
      setError('Failed to create note.');
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 3 || title.length > 50) {
      setError('Title must be between 3 and 50 characters.');
      return;
    }
    if (content.length > 500) {
      setError('Content must be less than 500 characters.');
      return;
    }

    mutation.mutate({ title, content, tag });
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
          onChange={(e) => setDraft({ title: e.target.value })}
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
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={(e) => setDraft({ tag: e.target.value })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
