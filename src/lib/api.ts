import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { GroceryItem, GroceryItemCreate } from "@/types/grocery";
import { auth } from "@/lib/firebaseConfig";

const COLLECTION_NAME = "groceryItems";

export const fetchGroceryItems = async (): Promise<GroceryItem[]> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const querySnapshot = await getDocs(
      collection(db, COLLECTION_NAME)
    );
    const items: GroceryItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId === user.uid) {
        items.push({ id: doc.id, ...data } as GroceryItem);
      }
    });
    return items;
  } catch (error) {
    console.error("Error fetching grocery items:", error);
    throw new Error("Failed to fetch grocery items");
  }
}

export const addGroceryItem = async (item: GroceryItemCreate): Promise<GroceryItem> => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");

    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...item,
      bought: false,
      userId: user.uid,
    });
    return { id: docRef.id, ...item, unit: item.unit, bought: false, userId: user.uid };
  } catch (error) {
    console.error("Error adding grocery item:", error);
    throw new Error("Failed to add grocery item");
  }
}

export const updateGroceryItem = async (item: GroceryItem): Promise<GroceryItem> => {
  try {
    if (!item.id) {
      throw new Error("Item ID is missing");
    }
    const docRef = doc(db, COLLECTION_NAME, item.id);
    await updateDoc(docRef, {
      name: item.name,
      amount: item.amount,
      unit: item.unit,
      bought: item.bought,
      category: item.category,
    });
    return item;
  } catch (error) {
    console.error("Error updating grocery item:", error);
    throw new Error("Failed to update grocery item");
  }
}

export const deleteGroceryItem = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting grocery item:", error);
    throw new Error("Failed to delete grocery item");
  }
}