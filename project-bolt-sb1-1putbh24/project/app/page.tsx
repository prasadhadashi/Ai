'use client';

import React, { useState, useEffect } from 'react';
import { NoteCard } from '@/components/note-card';
import { useNotes } from '@/lib/notes-context';
import { TagFilter } from '@/components/tag-filter';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusCircle, RefreshCw, FileText } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { AuthForm } from '@/components/auth/auth-form';
import { Greeting } from '@/components/greeting';

export default function Home() {
  const { notes, filterNotesByTag } = useNotes();
  const { user, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');
  const [displayedNotes, setDisplayedNotes] = useState(notes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeTag) {
      setDisplayedNotes(filterNotesByTag(activeTag));
    } else {
      setDisplayedNotes(notes);
    }
  }, [notes, activeTag, filterNotesByTag]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="container py-8 flex items-center justify-center h-[70vh]">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-16 mx-auto">
        <AuthForm />
      </div>
    );
  }

  return (
    <main className="container py-8 mx-auto">
      <Greeting />
      <TagFilter />
      
      {displayedNotes.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        >
          <AnimatePresence>
            {displayedNotes.map(note => (
              <motion.div 
                key={note.id}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md"
              >
                <NoteCard note={note} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <div className="bg-muted rounded-full p-6 mb-4">
            <FileText className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No notes found</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            {activeTag 
              ? `No notes with the tag "${activeTag}" found.` 
              : "You haven't created any notes yet. Start by creating your first note."}
          </p>
          <Button asChild>
            <Link href="/note/new">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Note
            </Link>
          </Button>
        </div>
      )}
    </main>
  );
}