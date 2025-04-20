'use client';

import React, { useEffect, useState } from 'react';
import { useNotes } from '@/lib/notes-context';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Edit, ArrowLeft, Trash2, Calendar, Loader2 } from 'lucide-react';
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

export default function NotePage() {
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

  const handleDelete = () => {
    deleteNote(note.id);
    toast.success('Note deleted successfully');
    router.push('/');
  };

  // Format content with line breaks
  const formattedContent = note.content.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < note.content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/note/edit/${note.id}`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
              >
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
                <AlertDialogAction 
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <article className="bg-card rounded-lg border p-6 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <Calendar className="h-4 w-4 mr-1" />
          <div className="flex gap-2">
            <span>Created: {format(new Date(note.createdAt), 'MMM d, yyyy')}</span>
            <span>•</span>
            <span>Updated: {format(new Date(note.updatedAt), 'MMM d, yyyy')}</span>
          </div>
        </div>
        
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {note.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="prose prose-sm sm:prose max-w-none dark:prose-invert">
          {formattedContent}
        </div>
      </article>
    </div>
  );
}