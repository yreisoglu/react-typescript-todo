import create from "zustand";

type AppState = {
  isDragging: boolean;
  toggleDragging: () => void;
};

const useStore = create<AppState>((set) => ({
  isDragging: false,
  toggleDragging() {
    set((state) => ({
      isDragging: !state.isDragging,
    }));
  },
}));

export default useStore;
