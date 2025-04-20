'use client';

import React from 'react';
import { NoteForm } from '@/components/note-form';

export default function NewNotePage() {
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create New Note</h1>
        <p className="text-muted-foreground">Capture your thoughts, ideas, and reminders.</p>
      </div>
      <NoteForm mode="create" />
    </div>
  );
}