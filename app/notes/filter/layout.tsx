import React from 'react';

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '1rem',
        alignItems: 'start',
      }}
    >
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
