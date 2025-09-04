'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteModalClient from '@/app/@modal/(.)notes/[id]/NoteModalClient';
import type { Note } from '@/types/note';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, tag]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag: tag && tag !== 'All' ? tag : undefined,
      }),
  });

  return (
    <div>
      <header>
        <SearchBox value={search} onChange={setSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={setPage}
            currentPage={page}
          />
        )}
        <button onClick={() => setIsCreateModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {error && <p>Could not fetch notes.</p>}
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onView={note => setSelectedNote(note) } />
      )}
      {data && data.notes.length === 0 && <p>No notes found.</p>}

      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <NoteForm onCancel={() => setIsCreateModalOpen(false)} />
        </Modal>
      )}

      {selectedNote && <NoteModalClient noteId={selectedNote.id} />}
    </div>
  );
  
}

