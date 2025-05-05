import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { GroceryItem } from "@/types/grocery";
import { categories } from "@/models/categories";

interface GroceryListItemProps {
  item: GroceryItem;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const GroceryListItem = ({
  item,
  onToggle,
  onEdit,
  onDelete,
}: GroceryListItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const category = categories.find((cat) => cat.id === item.category);

  return (
    <li
      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        {category && (
          <img src={category.image} alt={category.name} className="h-12 w-12 rounded-md object-cover" />
        )}
        <Checkbox
          checked={item.bought}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
        />
        <div className="flex flex-col">
          <span
            className={cn(
              "text-base font-medium",
              item.bought && "line-through text-muted-foreground"
            )}
          >
            {item.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {`${item.amount}${item.unit}`}
          </span>
          {category && <p className="text-xs text-muted-foreground">{category.name}</p>}
        </div>
      </div>
      <div className={cn("flex gap-2", !isHovered && "sm:opacity-0 sm:invisible transition-opacity duration-200")}>
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="h-8 w-8"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </li>
  );
}
