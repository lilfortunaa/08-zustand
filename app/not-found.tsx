import css from './../app/notes/filter/[...slug]/page.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'This page does not exist or has been removed',
  openGraph: {
    title: "Page Not Found",
    description:"You are trying to access a page that does not exist",
    url:'',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 425,
      height:283,
      alt:'NoteHub Preview',
    }]
  }
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
