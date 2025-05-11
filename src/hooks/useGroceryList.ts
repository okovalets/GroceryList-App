import { useMemo, useState } from "react";
import { useGroceryStore } from "@/store/groceryStore";
import { GroceryItem, GroceryItemCreate } from "@/types/grocery";
import { useGroceryFilter } from "@/hooks/useGroceryFilter";
import { categories } from "@/models/categories";
import { toast } from "./use-toast";
import {
  useGroceryItems,
  useAddGroceryItem,
  useUpdateGroceryItem,
  useDeleteGroceryItem,
} from "@/hooks/useGroceryItems";

export function useGroceryList() {
  const {
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setAddDialogOpen,
    itemToEdit,
    setItemToEdit,
    itemToDelete,
    setItemToDelete,
  } = useGroceryStore();

  const filter = useGroceryFilter();

  const { data: groceryItems = [], isLoading } = useGroceryItems();
  const [isMutating, setIsMutating] = useState(false);

  const addMutation = useAddGroceryItem();
  const updateMutation = useUpdateGroceryItem();
  const deleteMutation = useDeleteGroceryItem();

  const filteredItems = useMemo(() => {
    return groceryItems.filter(item => {
      const byCategory = filter.category === "all" || item.category === filter.category;
      const byStatus =
        filter.status === "all" ||
        (filter.status === "bought" && item.bought) ||
        (filter.status === "not_bought" && !item.bought);
      const bySearch =
        searchTerm.trim() === "" ||
        item.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
      return byCategory && byStatus && bySearch;
    });
  }, [groceryItems, filter.category, filter.status, searchTerm]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, GroceryItem[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const visibleCategories = useMemo(
    () => categories.filter(cat => groupedItems[cat.id] && groupedItems[cat.id].length > 0),
    [groupedItems]
  );

  const handleAddItem = async (newItem: GroceryItemCreate) => {
    setIsMutating(true);
    await addMutation.mutateAsync(newItem);
    setIsMutating(false);
    setAddDialogOpen(false);
    toast({
      title: "Item added!",
      description: "Your item was successfully added to the list.",
      duration: 2000,
    });
  };

  const handleEditItem = async (updatedItem: GroceryItem) => {
    setIsMutating(true);
    await updateMutation.mutateAsync(updatedItem);
    setItemToEdit(null);
    setIsMutating(false);
    toast({
      title: "Item updated!",
      description: "Changes saved.",
      duration: 2000,
    });
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    setIsMutating(true);
    await deleteMutation.mutateAsync(itemToDelete.id);
    setIsMutating(false);
    setItemToDelete(null);
    toast({
      title: "Item deleted!",
      description: "The item was removed from your list.",
      variant: "destructive",
      duration: 2000,
    });
  };

  return {
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setAddDialogOpen,
    itemToEdit,
    setItemToEdit,
    itemToDelete,
    setItemToDelete,
    isLoading: isLoading || isMutating,
    filter,
    visibleCategories,
    groupedItems,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
  };
}