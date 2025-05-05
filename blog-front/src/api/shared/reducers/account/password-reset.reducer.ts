import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface PasswordResetState {
  loading: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailure: boolean;
  successMessage: string | null;
}

const initialState: PasswordResetState = {
  loading: false,
  resetPasswordSuccess: false,
  resetPasswordFailure: false,
  successMessage: null,
};

// Example of createAsyncThunk
export const handlePasswordResetInit = createAsyncThunk(
  'passwordReset/init',
  async (email: string) => {
    const response = await axios.post('/api/account/reset-password/init', { email });
    return response.data;
  }
);

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(handlePasswordResetInit.pending, state => {
        state.loading = true;
        state.resetPasswordSuccess = false;
        state.resetPasswordFailure = false;
        state.successMessage = null;
      })
      .addCase(handlePasswordResetInit.fulfilled, state => {
        state.loading = false;
        state.resetPasswordSuccess = true;
        state.resetPasswordFailure = false;
        state.successMessage = 'Password reset email sent successfully';
      })
      .addCase(handlePasswordResetInit.rejected, state => {
        state.loading = false;
        state.resetPasswordSuccess = false;
        state.resetPasswordFailure = true;
        state.successMessage = null;
      });
  },
});

export default passwordResetSlice.reducer;