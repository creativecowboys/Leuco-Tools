import type { Metadata } from 'next';
import EditsClient from './Edits-client';

export const metadata: Metadata = {
  title: 'Edit Requests — LEUCO',
  description: 'Internal dashboard for website edit requests',
  robots: {
    index: false,
    follow: false,
  },
};

export default function EditsPage() {
  return <EditsClient />;
}
