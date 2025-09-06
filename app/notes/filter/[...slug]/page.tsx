import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import { NoteTag } from '@/types/note';
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import {Metadata} from 'next';

const allowedTags: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

interface NotesPageProps {
  params: { slug?: string[] };
}

export async function generateMetadata({ params }: NotesPageProps):Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params); 
  const slug = resolvedParams?.slug ?? [];

  const tag =
    slug[0] && slug[0] !== 'All' && allowedTags.includes(slug[0] as NoteTag)
      ? slug[0]
      : undefined;

  const pageTitle = tag
    ? `Notes filtered by ${tag} | NoteHub`
    : 'All Notes | NoteHub';

  const pageDescription = tag
    ? `Browse and organize your notes filtered by ${tag}.`
    : 'Browse and organize all your notes in NoteHub.';

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: tag ? `/notes/filter/${tag}` : '/notes/filter/All',
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
}


export default async function NotesPage(props: NotesPageProps) {
  const params = await Promise.resolve(props.params);
  const slug = params?.slug ?? [];

  const tag =
    slug[0] && slug[0] !== 'All' && allowedTags.includes(slug[0] as NoteTag)
      ? slug[0]
      : undefined;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
