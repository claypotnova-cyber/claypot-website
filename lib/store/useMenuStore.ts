import { create } from 'zustand';
import { MenuCategory, MenuItem } from '../data/menu';

interface MenuState {
  searchQuery: string;
  activeCategory: MenuCategory;
  dietaryFilter: 'all' | 'veg' | 'non-veg';
  selectedItem: MenuItem | null;
  
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: MenuCategory) => void;
  setDietaryFilter: (filter: 'all' | 'veg' | 'non-veg') => void;
  setSelectedItem: (item: MenuItem | null) => void;
  resetFilters: () => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  searchQuery: '',
  activeCategory: 'featured',
  dietaryFilter: 'all',
  selectedItem: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setDietaryFilter: (filter) => set({ dietaryFilter: filter }),
  setSelectedItem: (item) => set({ selectedItem: item }),
  resetFilters: () => set({ 
    searchQuery: '', 
    activeCategory: 'featured', 
    dietaryFilter: 'all' 
  }),
}));
