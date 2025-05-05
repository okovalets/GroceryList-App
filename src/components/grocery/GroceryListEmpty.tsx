import { SearchX, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  searchTerm: string;
  onClearSearch: () => void;
  onAddItem: () => void;
}

export const GroceryListEmpty = ({
  searchTerm,
  onClearSearch,
  onAddItem,
}: EmptyStateProps) =>{
  if (searchTerm) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No items found</h3>
        <p className="text-muted-foreground mt-1 mb-4">
          No items match your search "{searchTerm}".
        </p>
        <Button onClick={onClearSearch} variant="outline">
          Clear search
        </Button>
      </div>
    );
  }

  return (
    <div className="py-12 flex flex-col items-center justify-center text-center">
      <ShoppingBasket className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">Your grocery list is empty</h3>
      <p className="text-muted-foreground mt-1 mb-4">
        Add your first item to get started!
      </p>
      <Button onClick={onAddItem}>Add Item</Button>
    </div>
  );
}