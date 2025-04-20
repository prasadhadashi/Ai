'use client';

import React, { useEffect, useState } from 'react';
import { NoteForm } from '@/components/note-form';
import { useNotes } from '@/lib/notes-context';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

export default function EditNotePage() {
  const { id } = useParams();
  const { getNoteById, deleteNote } = useNotes();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState(getNoteById(id as string));

  useEffect(() => {
    const foundNote = getNoteById(id as string);
    setNote(foundNote);
    setIsLoading(false);
  }, [id, getNoteById]);

  const handleDelete = () => {
    deleteNote(note!.id);
    toast.success('Note deleted successfully');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (!note) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Note not found</h1>
        <p className="mb-6">The note you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => router.push('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to notes
        </Button>
      </div>
    );
  }

  const initialData = {
    title: note.title,
    content: note.content,
    tags: note.tags
  };

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <h1 className="text-2xl font-bold">Edit Note</h1>
          <p className="text-muted-foreground">Update your note details.</p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Note</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this note? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <NoteForm mode="edit" initialData={initialData} noteId={note.id} />
    </div>
  );
}