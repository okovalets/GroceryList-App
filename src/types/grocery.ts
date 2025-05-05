export interface GroceryItem {
  id: string;
  name: string;
  amount: string;
  unit: string;
  bought: boolean;
  category: string;
  userId: string;
}

export interface GroceryItemCreate {
  name: string;
  amount: string;
  unit: string;
  category: string;
  bought?: boolean;
}

export type FilterStatus = "all" | "bought" | "not_bought";
