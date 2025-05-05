import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GroceryListEmpty } from "./GroceryListEmpty";
import { AddItemDialog } from "@/components/dialogs/AddItemDialog";
import { EditItemDialog } from "@/components/dialogs/EditItemDialog";
import { DeleteItemDialog } from "@/components/dialogs/DeleteItemDialog";
import { GroceryFilter } from "./GroceryFilter";
import { GroceryCategoryGroup } from "./GroceryCategoryGroup";
import { useGroceryList } from "@/hooks/useGroceryList";
import { GrocerySkeleton } from "./GrocerySkeleton";

export const GroceryList = () => {
  const {
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
  } = useGroceryList();

  if (isLoading) return <GrocerySkeleton />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setAddDialogOpen(true)}
          className="w-full sm:w-auto"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <GroceryFilter {...filter} />

      <Card className="p-4">
        {visibleCategories.length === 0 ? (
          <GroceryListEmpty
            searchTerm={searchTerm}
            onClearSearch={() => setSearchTerm("")}
            onAddItem={() => setAddDialogOpen(true)}
          />
        ) : (
          <div className="space-y-8">
            {visibleCategories.map(category => (
              <GroceryCategoryGroup
                key={category.id}
                categoryId={category.id}
                items={groupedItems[category.id]}
                onToggle={item => handleEditItem({ ...item, bought: !item.bought })}
                onEdit={setItemToEdit}
                onDelete={setItemToDelete}
              />
            ))}
          </div>
        )}
      </Card>

      <AddItemDialog
        open={isAddDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmit={handleAddItem}
        isLoading={isLoading}
      />

      {itemToEdit && (
        <EditItemDialog
          open={!!itemToEdit}
          item={itemToEdit}
          onOpenChange={() => setItemToEdit(null)}
          onSubmit={handleEditItem}
          isLoading={isLoading}
        />
      )}

      {itemToDelete && (
        <DeleteItemDialog
          open={!!itemToDelete}
          item={itemToDelete}
          onOpenChange={() => setItemToDelete(null)}
          onConfirm={handleDeleteItem}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};