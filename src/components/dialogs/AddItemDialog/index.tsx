import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { categories } from "@/models/categories";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GroceryItemCreate } from "@/types/grocery";
import { units } from "@/models/units";
import { AddItemForm } from "./AddItemForm";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.coerce.number().min(0.01, "Amount is required"),
  unit: z.string().min(1, "Unit is required"),
  category: z.string().min(1, "Category is required"),
});

type FormValues = z.infer<typeof schema>;

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GroceryItemCreate) => void;
  isLoading: boolean;
}

export const AddItemDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading
}: AddItemDialogProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      amount: 1,
      unit: units[0].value,
      category: categories[0]?.id ?? "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit({ ...data, bought: false, unit: data.unit, amount: data.amount.toString() });
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Grocery Item</DialogTitle>
        </DialogHeader>
        <AddItemForm
          form={form}
          isLoading={isLoading}
          onOpenChange={onOpenChange}
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}