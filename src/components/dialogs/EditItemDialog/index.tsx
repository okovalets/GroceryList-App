import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GroceryItem } from "@/types/grocery";
import { categories } from "@/models/categories";
import { EditItemForm } from "./EditItemForm";

const groceryItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  amount: z.coerce.number().min(0.01, "Amount is required"),
  unit: z.string().min(1, "Unit is required"),
  bought: z.boolean(),
  category: z.string(),
  userId: z.string(),
});

interface EditItemDialogProps {
  open: boolean;
  item: GroceryItem;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GroceryItem) => void;
  isLoading: boolean;
}

export const EditItemDialog = ({
  open,
  item,
  onOpenChange,
  onSubmit,
  isLoading,
}: EditItemDialogProps) => {
  const form = useForm<z.infer<typeof groceryItemSchema>>({
    resolver: zodResolver(groceryItemSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      amount: Number(item.amount),
      unit: item.unit,
      bought: item.bought,
      category: item.category || categories[0].id,
      userId: item.userId,
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        id: item.id,
        name: item.name,
        amount: Number(item.amount),
        unit: item.unit,
        bought: item.bought,
        category: item.category || categories[0].id,
        userId: item.userId,
      });
    }
  }, [item, form]);

  const handleSubmit = (data: z.infer<typeof groceryItemSchema>) => {
    onSubmit({ ...data, amount: data.amount.toString() });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit grocery item</DialogTitle>
        </DialogHeader>
        <EditItemForm
          form={form}
          isLoading={isLoading}
          onOpenChange={onOpenChange}
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};