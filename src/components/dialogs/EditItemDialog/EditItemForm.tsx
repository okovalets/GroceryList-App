import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { categories } from "@/models/categories";
import { units } from "@/models/units";
import { DialogFooter } from "@/components/ui/dialog";
import { UseFormReturn } from "react-hook-form";

interface EditItemFormProps {
  form: UseFormReturn<any>;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  handleSubmit: (data: any) => void;
}

export const EditItemForm = ({ form, isLoading, onOpenChange, handleSubmit }: EditItemFormProps) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g. Apples" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-2">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step="any"
                  placeholder="e.g. 1"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem className="w-28">
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <select className="w-full border rounded-md p-2 bg-background text-foreground" {...field}>
                  {units.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <select className="w-full border rounded-md p-2 bg-background text-foreground" {...field}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bought"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Bought</FormLabel>
              <p className="text-sm text-muted-foreground">
                Mark this item as purchased
              </p>
            </div>
          </FormItem>
        )}
      />
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  </Form>
);