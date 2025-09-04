'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

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
        <Link href="/notes/action/create">
          <button>Create note +</button>
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}
      {error && <p>Could not fetch notes.</p>}
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onView={() => {}} />
      )}
      {data && data.notes.length === 0 && <p>No notes found.</p>}
    </div>
  );
}
