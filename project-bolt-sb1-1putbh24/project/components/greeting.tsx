'use client';

import React from 'react';
import { useAuth } from '@/lib/auth-context';

export function Greeting() {
  const { user } = useAuth();
  const hour = new Date().getHours();

  const getGreeting = () => {
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (!user) return null;

  return (
    <h2 className="text-2xl font-semibold mb-6">
      {getGreeting()}, {user.name}!
    </h2>
  );
}