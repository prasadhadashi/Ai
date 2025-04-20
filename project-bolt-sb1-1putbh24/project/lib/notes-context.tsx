'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note, NoteFormData } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

interface NotesContextType {
  notes: Note[];
  addNote: (data: NoteFormData) => void;
  updateNote: (id: string, data: Partial<NoteFormData>) => void;
  deleteNote: (id: string) => void;
  getNoteById: (id: string) => Note | undefined;
  filterNotesByTag: (tag: string) => Note[];
  searchNotes: (query: string) => Note[];
  allTags: string[];
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        // Convert string dates back to Date objects
        const notesWithDates = parsedNotes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        setNotes(notesWithDates);
        updateTagsList(notesWithDates);
      } catch (error) {
        console.error('Failed to parse saved notes:', error);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    updateTagsList(notes);
  }, [notes]);

  const updateTagsList = (notesList: Note[]) => {
    const tags = new Set<string>();
    notesList.forEach(note => {
      note.tags.forEach(tag => tags.add(tag));
    });
    setAllTags(Array.from(tags));
  };

  const addNote = (data: NoteFormData) => {
    const newNote: Note = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, data: Partial<NoteFormData>) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === id 
          ? { ...note, ...data, updatedAt: new Date() } 
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getNoteById = (id: string) => {
    return notes.find(note => note.id === id);
  };

  const filterNotesByTag = (tag: string) => {
    return notes.filter(note => note.tags.includes(tag));
  };

  const searchNotes = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return notes.filter(note => 
      note.title.toLowerCase().includes(lowercaseQuery) || 
      note.content.toLowerCase().includes(lowercaseQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        deleteNote,
        getNoteById,
        filterNotesByTag,
        searchNotes,
        allTags
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};