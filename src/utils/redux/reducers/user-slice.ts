import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserDto } from '@/utils/api';
import { getProfile, GetProfileConfig } from '@/utils/api/requests';

export interface UserSlice {
  value?: UserDto;
  loading: boolean;
  error: string | null;
}

const initialState: UserSlice = {
  value: undefined,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<UserDto, GetProfileConfig>(
  'fetchUser',
  async (config, { rejectWithValue }) => {
    try {
      return await getProfile(config);
    } catch (error) {
      return rejectWithValue('Failed to fetch user');
    }
  }
);

export const userSlice = createSlice({
  name: 'fetchUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDto>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserDto>) => {
        state.value = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const userReducer = userSlice.reducer;
