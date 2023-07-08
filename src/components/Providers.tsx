"use client";

import * as React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "./ui/toaster";

const queryClient = new QueryClient();

interface ProviderProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children} <Toaster />
    </QueryClientProvider>
  );
}
