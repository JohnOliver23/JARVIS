"use client";

import { Visitor } from "@/types/visitor";
import type React from "react";

import { useState, useMemo } from "react";

export function useVisitorHistoryFilter(visitors: Visitor[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVisitors = useMemo(() => {
    if (!visitors) return [];
    return visitors.filter(
      (visitor) =>
        visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.cpf.includes(searchTerm) ||
        visitor.destinationRoom.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [visitors, searchTerm]);

  const handleChangeSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return { searchTerm, handleChangeSearchTerm, filteredVisitors };
}
