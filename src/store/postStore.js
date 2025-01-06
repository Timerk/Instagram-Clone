import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      }),
    })),
    
  deletePost: (id) =>
      set((state) => {
        const updatedPosts = state.posts.filter((post) => post.id !== id);
        return { posts: updatedPosts };
      }),

  setPosts: (posts) => set({ posts }),

  addOrRemoveLike: (postId, userId, isLiked) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: isLiked
              ? post.likes.filter((id) => id !== userId) 
              : [...post.likes, userId], 
          };
        }
        return post;
      }),
    })),

  getPostById: (id) => usePostStore((state) => state.posts.find((post) => post.id === id)),
  
  }));

export default usePostStore;
