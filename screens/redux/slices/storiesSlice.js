import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper to retrieve auth headers from async storage
const getAuthHeaders = async () => {
  const username = await AsyncStorage.getItem('username');
  const password = await AsyncStorage.getItem('password');
  const headers = { 'Content-Type': 'application/json' };
  if (username && password) {
    // Using Basic Auth (ensure btoa is available in your environment)
    const token = btoa(`${username}:${password}`);
    headers['Authorization'] = `Basic ${token}`;
  }
  return headers;
};

// Fetch all stories
export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async () => {
    const response = await fetch('http://192.168.0.100:8000/api/stories/stories/');
    const data = await response.json();
    return data.results;
  }
);

// Toggle like/unlike for a story
export const toggleStoryLike = createAsyncThunk(
  'stories/toggleStoryLike',
  async (storyId, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`http://192.168.0.100:8000/api/stories/stories/${storyId}/toggle_like/`, {
        method: 'POST',
        headers,
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      // Return the story ID along with the updated like info
      return { storyId, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Post a new comment for a story
export const postComment = createAsyncThunk(
  'stories/postComment',
  async ({ storyId, userId, text }, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`http://192.168.0.100:8000/api/stories/stories/${storyId}/comments/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ story: storyId, user_id: userId, text }),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return { storyId, comment: data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch comments for a specific story
export const fetchComments = createAsyncThunk(
  'stories/fetchComments',
  async (storyId, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`http://192.168.0.100:8000/api/stories/stories/${storyId}/comments/`, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return { storyId, comments: data.results, count: data.count };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    stories: [],
    loading: false,
    error: null,
    // Store comments for each story keyed by story ID
    commentsByStory: {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stories
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Toggle Like/Unlike
      .addCase(toggleStoryLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleStoryLike.fulfilled, (state, action) => {
        state.loading = false;
        const { storyId, data } = action.payload;
        const storyIndex = state.stories.findIndex((story) => story.id === storyId);
        if (storyIndex !== -1) {
          state.stories[storyIndex].likes_count = data.likes_count;
          state.stories[storyIndex].is_liked = data.status === 'liked';
        }
      })
      .addCase(toggleStoryLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Post Comment
      .addCase(postComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.loading = false;
        const { storyId, comment } = action.payload;
        // Append the comment to the corresponding story's comments array
        const storyIndex = state.stories.findIndex((story) => story.id === storyId);
        if (storyIndex !== -1) {
          state.stories[storyIndex].comments.push(comment);
        }
        // Also update the separate commentsByStory state if already fetched
        if (state.commentsByStory[storyId]) {
          state.commentsByStory[storyId].push(comment);
        }
      })
      .addCase(postComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Comments for a Story
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        const { storyId, comments } = action.payload;
        state.commentsByStory[storyId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default storiesSlice.reducer;
