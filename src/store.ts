import create from "zustand";

type AppState = {
  isDragging: boolean;
  toggleDragging: () => void;
  emptyItem: [Object];
  setEmptyItem: (item: any) => void;
};

const useStore = create<AppState>((set) => ({
  isDragging: false,
  emptyItem: [
    {
      content: null,
      emoji: null,
      date: null,
      id: null,
    },
  ],
  setEmptyItem(item: any) {
    set((state) => ({
      emptyItem: item,
    }));
  },
  toggleDragging() {
    set((state) => ({
      isDragging: !state.isDragging,
    }));
  },
}));

export default useStore;
