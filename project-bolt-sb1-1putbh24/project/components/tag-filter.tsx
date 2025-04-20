'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useNotes } from '@/lib/notes-context';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function TagFilter() {
  const { allTags } = useNotes();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const handleSelectTag = (tag: string) => {
    router.push(`/?tag=${tag}`);
  };

  const handleClearFilter = () => {
    router.push('/');
  };

  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Filter by Tag</h3>
        {activeTag && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilter}
            className="h-7 px-2 text-xs"
          >
            Clear <X className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-2 pb-1">
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleSelectTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}