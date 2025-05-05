import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { GroceryList } from "@/components/grocery/GroceryList";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <GroceryList />
    </ProtectedRoute>
  );
}