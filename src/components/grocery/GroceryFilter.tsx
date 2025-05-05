import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useGroceryFilter } from "@/hooks/useGroceryFilter";

export const GroceryFilter = memo(function GroceryFilter({
  category,
  setCategory,
  status,
  setStatus,
  categoryOptions,
  statusOptions,
}: ReturnType<typeof useGroceryFilter>) {
  const handleReset = () => {
    setCategory("all");
    setStatus("all");
  };

  return (
    <div className="flex gap-4 mb-4 items-end">
      <div className="flex flex-col">
        <label className="mb-1 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
          Category
        </label>
        <select
          className="border rounded-md p-2 bg-background focus:ring-2 focus:ring-primary/50 transition"
          value={category}
          onChange={e => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          {categoryOptions.map(opt => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-xs font-semibold text-muted-foreground tracking-wide uppercase">
          Status
        </label>
        <select
          className="border rounded-md p-2 bg-background focus:ring-2 focus:ring-primary/50 transition"
          value={status}
          onChange={e => setStatus(e.target.value as any)}
          aria-label="Filter by status"
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <Button
        type="button"
        variant="outline"
        className="h-10 mt-4"
        onClick={handleReset}
      >
        Reset
      </Button>
    </div>
  );
});