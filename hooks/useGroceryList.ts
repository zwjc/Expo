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

const parseMeasure = (measure: string): { value: number, unit: string } => {
  const match = measure.match(/^([\d/.]+)\s*(.*)$/);
  if (!match) return { value: 0, unit: '' };

  let valueStr = match[1];
  const unit = match[2].toLowerCase();

  // Handle fractions
  if (valueStr.includes('/')) {
    const parts = valueStr.split('/');
    if (parts.length === 2) {
      const num = parseFloat(parts[0]);
      const den = parseFloat(parts[1]);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return { value: num / den, unit };
      }
    }
    return { value: 0, unit }; // Invalid fraction
  }

  const value = parseFloat(valueStr);
  return { value: isNaN(value) ? 0 : value, unit };
};

const formatMeasure = (value: number, unit: string): string => {
  if (value === 0) return unit; // Handle cases like "a pinch of salt"
  // Simple formatting, can be improved
  return `${Number(value.toFixed(2))} ${unit}`.trim();
};

export const useGroceryList = create<GroceryListState>((set) => ({
  items: [],
  addItems: (newItems) =>
    set((state) => {
      const updatedItems = [...state.items];
      newItems.forEach((newItem) => {
        const existingItemIndex = updatedItems.findIndex((item) => item.name.toLowerCase() === newItem.name.toLowerCase());
        if (existingItemIndex > -1) {
          const existingItem = updatedItems[existingItemIndex];
          const existingMeasure = parseMeasure(existingItem.measure);
          const newMeasure = parseMeasure(newItem.measure);

          if (existingMeasure.unit === newMeasure.unit) {
            const combinedValue = existingMeasure.value + newMeasure.value;
            updatedItems[existingItemIndex] = {
              ...existingItem,
              measure: formatMeasure(combinedValue, existingMeasure.unit),
            };
          } else {
            updatedItems.push(newItem);
          }
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
