import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";

// const initialState = [
//   {
//     id: "1",
//     user: "1",
//     title: "First Post!",
//     content: "Hello!",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//   },
//   {
//     id: "2",
//     user: "2",
//     title: "Second Post",
//     content: "More text",
//     date: sub(new Date(), { minutes: 20 }).toISOString(),
//   },
// ];
const initialState = {
  posts: [],
  status: "idle",
  error: null,
};
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("http://localhost:5050/posts");
  const jsonData = await response.json();
  return jsonData;
});

const getPosts = async () => {
  try {
    const response = await fetch("http://localhost:5050/posts");
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error.message);
  }
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
          },
        };
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated } = postSlice.actions;
export default postSlice.reducer;
