'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/search-bar';
import { PlusCircle, StickyNote, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/mode-toggle';
import { useAuth } from '@/lib/auth-context';

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { user, signOut } = useAuth();
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4 mx-auto">
        <div className="flex items-center justify-center flex-1">
          <Link href="/" className="flex items-center mr-8">
            <StickyNote className="h-6 w-6 mr-2" />
            <span className="font-bold text-xl">Notes</span>
          </Link>
          
          {isHomePage && user && <SearchBar />}
        </div>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          {user && (
            <>
              <Button asChild>
                <Link href="/note/new">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Note
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={() => signOut()}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}