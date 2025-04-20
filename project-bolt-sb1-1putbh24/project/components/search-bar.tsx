'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useNotes } from '@/lib/notes-context';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { searchNotes, allTags } = useNotes();
  const router = useRouter();
  const searchResults = query.trim() ? searchNotes(query) : [];
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleClear = () => {
    setQuery('');
    setShowResults(false);
  };

  const handleSelectNote = (id: string) => {
    router.push(`/note/${id}`);
    setShowResults(false);
    setQuery('');
  };

  const handleSelectTag = (tag: string) => {
    router.push(`/?tag=${tag}`);
    setShowResults(false);
    setQuery('');
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter tags based on query
  const filteredTags = allTags.filter(tag => 
    tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md" ref={searchContainerRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes or tags..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim()) {
              setShowResults(true);
            } else {
              setShowResults(false);
            }
          }}
          onFocus={() => {
            if (query.trim()) {
              setShowResults(true);
            }
          }}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {showResults && (query.trim() !== '') && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-1 w-full bg-card z-50 rounded-md border shadow-lg overflow-hidden"
          >
            <div className="max-h-[70vh] overflow-auto p-2">
              {/* Tags section */}
              {filteredTags.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">Tags</h3>
                  <div className="flex flex-wrap gap-1 px-2">
                    {filteredTags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => handleSelectTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Notes section */}
              {searchResults.length > 0 ? (
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">Notes</h3>
                  {searchResults.map(note => (
                    <div
                      key={note.id}
                      onClick={() => handleSelectNote(note.id)}
                      className="px-3 py-2 hover:bg-muted rounded-md cursor-pointer transition-colors"
                    >
                      <div className="font-medium truncate">{note.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{note.content}</div>
                    </div>
                  ))}
                </div>
              ) : (
                query.trim() !== '' && (
                  <div className="px-3 py-4 text-center text-muted-foreground">
                    No notes found for "{query}"
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}