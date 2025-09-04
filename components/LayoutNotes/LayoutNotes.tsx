import styles from './LayoutNotes.module.css';
import SidebarNotes from '../../app/notes/filter/@sidebar/SidebarNotes';

export default function LayoutNotes({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
