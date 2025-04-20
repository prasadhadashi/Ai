'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { NoteFormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNotes } from '@/lib/notes-context';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string())
});

type NoteFormProps = {
  initialData?: NoteFormData;
  noteId?: string;
  mode: 'create' | 'edit';
};

export function NoteForm({ initialData, noteId, mode }: NoteFormProps) {
  const router = useRouter();
  const { addNote, updateNote, allTags } = useNotes();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const defaultValues: NoteFormData = initialData || {
    title: '',
    content: '',
    tags: []
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      if (mode === 'create') {
        addNote(data);
        toast.success('Note created successfully');
        router.push('/');
      } else if (mode === 'edit' && noteId) {
        updateNote(noteId, data);
        toast.success('Note updated successfully');
        router.push(`/note/${noteId}`);
      }
    } catch (error) {
      toast.error('An error occurred while saving the note');
    }
  };

  const selectedTags = form.watch('tags');

  const handleSelect = (tag: string) => {
    const current = form.getValues('tags');
    if (!current.includes(tag)) {
      form.setValue('tags', [...current, tag]);
    }
    setInputValue('');
  };

  const handleRemoveTag = (tag: string) => {
    const current = form.getValues('tags');
    form.setValue('tags', current.filter(t => t !== tag));
  };

  const handleCreateTag = () => {
    if (inputValue.trim() && !selectedTags.includes(inputValue.trim())) {
      const newTag = inputValue.trim();
      form.setValue('tags', [...selectedTags, newTag]);
      setInputValue('');
    }
  };

  const filteredTags = allTags.filter(
    tag => !selectedTags.includes(tag) && 
    tag.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Note title" 
                  {...field} 
                  className="text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your note here..." 
                  {...field} 
                  className="min-h-[200px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm py-1">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    Add tags
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Search or create tag..." 
                      value={inputValue}
                      onValueChange={setInputValue}
                    />
                    <CommandList>
                      <CommandEmpty>
                        {inputValue.trim() && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-xs"
                            onClick={handleCreateTag}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create "{inputValue}"
                          </Button>
                        )}
                      </CommandEmpty>
                      <CommandGroup>
                        {filteredTags.map(tag => (
                          <CommandItem
                            key={tag}
                            value={tag}
                            onSelect={() => handleSelect(tag)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedTags.includes(tag) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {tag}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" className="w-full">
            {mode === 'create' ? 'Create Note' : 'Update Note'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}