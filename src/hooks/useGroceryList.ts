import { useEffect, useMemo } from "react";
import { useGroceryStore } from "@/store/groceryStore";
import { GroceryItem, GroceryItemCreate } from "@/types/grocery";
import { useGroceryFilter } from "@/hooks/useGroceryFilter";
import { categories } from "@/models/categories";
import { toast } from "./use-toast";

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
    groceryItems,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
    isLoading,
    setIsLoading,
  } = useGroceryStore();

  const filter = useGroceryFilter();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
    setIsLoading(true);
    await addItem(newItem);
    setIsLoading(false);
    setAddDialogOpen(false);
    toast({
      title: "Item added!",
      description: "Your item was successfully added to the list.",
      duration: 2000,
    });
  };

  const handleEditItem = async (updatedItem: GroceryItem) => {
    setIsLoading(true);
    await updateItem(updatedItem);
    setIsLoading(false);
    setItemToEdit(null);
    toast({
      title: "Item updated!",
      description: "Changes saved.",
      duration: 2000,
    });
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;
    setIsLoading(true);
    await deleteItem(itemToDelete.id);
    setIsLoading(false);
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
    isLoading,
    filter,
    visibleCategories,
    groupedItems,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
  };
}