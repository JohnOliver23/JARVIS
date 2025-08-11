"use client";

import { useState, type ChangeEvent } from "react";
import {
  useSupabaseActiveVisitorsQuery,
  useSupabaseRegisterExitMutation,
} from "@/hooks/use-supabase-visitors-query";

export function useVisitorsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: visitors = [],
    isLoading,
    error,
    refetch,
  } = useSupabaseActiveVisitorsQuery();
  const registerExitMutation = useSupabaseRegisterExitMutation();

  const filteredVisitors = visitors.filter(
    (visitor) =>
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.cpf.includes(searchTerm) ||
      visitor.destinationRoom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRegisterExit = async (visitorId: string) => {
    try {
      await registerExitMutation.mutateAsync(visitorId);
    } catch (error) {
      console.error("Error registering exit:", error);
    }
  };

  return {
    searchTerm,
    handleChangeSearchTerm,
    filteredVisitors,
    isLoading,
    error,
    refetch,
    handleRegisterExit,
    isRegisteringExit: registerExitMutation.isPending,
  };
}
