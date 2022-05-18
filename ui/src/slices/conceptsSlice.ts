import { createAsyncThunk, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../services/authService";

export interface ConceptState {
  concepts: Concept[],
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string
}

export interface Concept {
  name: string,
  email: string,
  password: string,
}

const user = JSON.parse(localStorage.user ?? null)

const initialState: AuthState = {
  user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => await authService.logout())

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      debugger
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const authActions = {...authSlice.actions, register}