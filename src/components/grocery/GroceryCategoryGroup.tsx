import { GroceryListItem } from "./GroceryListItem";
import { GroceryItem } from "@/types/grocery";
import { categories } from "@/models/categories";

interface Props {
  categoryId: string;
  items: GroceryItem[];
  onToggle: (item: GroceryItem) => void;
  onEdit: (item: GroceryItem) => void;
  onDelete: (item: GroceryItem) => void;
}

export function GroceryCategoryGroup({
  categoryId,
  items,
  onToggle,
  onEdit,
  onDelete,
}: Props) {
  const category = categories.find((cat) => cat.id === categoryId);
  if (!category) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <img
          src={category.image}
          alt={category.name}
          className="w-6 h-6 rounded-sm bg-muted"
          style={{ objectFit: "contain" }}
        />
        <span className="font-semibold text-lg">{category.name}</span>
      </div>
      <ul className="space-y-2">
        {items.map(item => (
          <GroceryListItem
            key={item.id}
            item={item}
            onToggle={() => onToggle(item)}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        ))}
      </ul>
    </div>
  );
}