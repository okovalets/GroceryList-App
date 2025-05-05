import { create } from "zustand";
import { fetchGroceryItems, addGroceryItem, updateGroceryItem, deleteGroceryItem } from "@/lib/api";
import { GroceryItem, GroceryItemCreate } from "@/types/grocery";

type GroceryStore = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  isAddDialogOpen: boolean;
  setAddDialogOpen: (isOpen: boolean) => void;

  itemToEdit: GroceryItem | null;
  setItemToEdit: (item: GroceryItem | null) => void;

  itemToDelete: GroceryItem | null;
  setItemToDelete: (item: GroceryItem | null) => void;

  groceryItems: GroceryItem[];
  fetchItems: () => Promise<void>;

  addItem: (item: GroceryItemCreate) => Promise<void>;
  updateItem: (item: GroceryItem) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
};

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  isAddDialogOpen: false,
  setAddDialogOpen: (isOpen) => set({ isAddDialogOpen: isOpen }),

  itemToEdit: null,
  setItemToEdit: (item) => set({ itemToEdit: item }),

  itemToDelete: null,
  setItemToDelete: (item) => set({ itemToDelete: item }),

  groceryItems: [],
  fetchItems: async () => {
    set({ isLoading: true });
    const items = await fetchGroceryItems();
    set({ groceryItems: items, isLoading: false });
  },

  addItem: async (item) => {
    await addGroceryItem(item);
    await get().fetchItems();
  },

  updateItem: async (item) => {
    await updateGroceryItem(item);
    await get().fetchItems();
  },

  deleteItem: async (id) => {
    await deleteGroceryItem(id);
    await get().fetchItems();
  },
}));