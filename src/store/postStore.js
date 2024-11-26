import { create } from "zustand";

const usePostStore = create((set) =>({
    posts:[],
    createPost: (post) => set((state) => ({post, ...state.posts})),
}))

export default usePostStore