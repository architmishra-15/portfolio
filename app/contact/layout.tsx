import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacts | Archit Mishra',
  description: 'Get in touch with Archit Mishra. Connect for projects, collaborations, or just to say hello.',
  keywords: ['contact', 'portfolio', 'archit mishra', 'developer', 'student'],
  openGraph: {
    title: 'Contacts | Archit Mishra',
    description: 'Get in touch with Archit Mishra. Connect for projects, collaborations, or just to say hello.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function ContactLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        {children}
      </>
    );
  }