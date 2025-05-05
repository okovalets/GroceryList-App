import { useState } from "react";
import { categories } from "@/models/categories";
import { FilterStatus } from "@/types/grocery";

export function useGroceryFilter() {
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<FilterStatus>("all");

  return {
    category,
    setCategory,
    status,
    setStatus,
    categoryOptions: [{ id: "all", name: "All" }, ...categories],
    statusOptions: [
      { value: "all", label: "All" },
      { value: "not_bought", label: "Not bought" },
      { value: "bought", label: "Bought" },
    ],
  };
}