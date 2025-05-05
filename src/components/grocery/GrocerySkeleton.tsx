import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const GrocerySkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full sm:w-32" />
      </div>
      <Skeleton className="h-8 w-40 mt-2" />
      <Card className="p-4 mt-2">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="w-6 h-6 rounded-sm" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-8 w-full" />
      </Card>
    </div>
  );
}