import { create } from "zustand";
import { GroceryItem } from "@/types/grocery";

type GroceryStore = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  isAddDialogOpen: boolean;
  setAddDialogOpen: (isOpen: boolean) => void;

  itemToEdit: GroceryItem | null;
  setItemToEdit: (item: GroceryItem | null) => void;

  itemToDelete: GroceryItem | null;
  setItemToDelete: (item: GroceryItem | null) => void;
};

export const useGroceryStore = create<GroceryStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  isAddDialogOpen: false,
  setAddDialogOpen: (isOpen) => set({ isAddDialogOpen: isOpen }),

  itemToEdit: null,
  setItemToEdit: (item) => set({ itemToEdit: item }),

  itemToDelete: null,
  setItemToDelete: (item) => set({ itemToDelete: item }),
}));