import { create } from 'zustand';

interface GroceryItem {
  name: string;
  measure: string;
}

interface GroceryListState {
  items: GroceryItem[];
  addItems: (items: GroceryItem[]) => void;
  removeItem: (itemName: string) => void;
  clearList: () => void;
}

export const useGroceryList = create<GroceryListState>((set) => ({
  items: [],
  addItems: (newItems) =>
    set((state) => {
      const updatedItems = [...state.items];
      newItems.forEach((newItem) => {
        const existingItemIndex = updatedItems.findIndex((item) => item.name.toLowerCase() === newItem.name.toLowerCase());
        if (existingItemIndex > -1) {
          // For simplicity, we are not aggregating measures here, just ensuring no duplicates.
          // A more advanced implementation could handle measure conversion and aggregation.
        } else {
          updatedItems.push(newItem);
        }
      });
      return { items: updatedItems };
    }),
  removeItem: (itemName) =>
    set((state) => ({
      items: state.items.filter((item) => item.name !== itemName),
    })),
  clearList: () => set({ items: [] }),
}));
