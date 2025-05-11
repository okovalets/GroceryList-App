import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchGroceryItems,
  addGroceryItem,
  updateGroceryItem,
  deleteGroceryItem,
} from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export const useGroceryItems = () => {
  return useQuery({
    queryKey: ["groceryItems"],
    queryFn: fetchGroceryItems,
  });
}

export const useAddGroceryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addGroceryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryItems"] });
    },
    onError: (error: any) => {
      toast({
        title: "Add error",
        description: error.message || "Failed to add grocery item.",
        variant: "destructive",
      });
    },
  });
}

export const useUpdateGroceryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGroceryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryItems"] });
    },
    onError: (error: any) => {
      toast({
        title: "Update error",
        description: error.message || "Failed to update grocery item.",
        variant: "destructive",
      });
    },
  });
}

export const useDeleteGroceryItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGroceryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryItems"] });
    },
    onError: (error: any) => {
      toast({
        title: "Delete error",
        description: error.message || "Failed to delete grocery item.",
        variant: "destructive",
      });
    },
  });
}