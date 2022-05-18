import { createAsyncThunk, createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../services/authService";
import { conceptService } from "../services/conceptService";

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

const initialState: ConceptState = {
  concepts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

const respondWithError = (error: any, thunkAPI) =>{
  const message = error?.response?.data?.message || error.message || error.toString()
  return thunkAPI.rejectWithValue(message)
}

export const getAll = createAsyncThunk(
  'concept/getAll',
  async (user, thunkAPI) => {
    try {
      return await conceptService.getAll()
    } catch (error: any) {
      return respondWithError(error, thunkAPI);
    }
  }
)

export const add = createAsyncThunk(
  'concept/add',
  async (concept, thunkAPI) => {
    try {
      return await conceptService.add(concept)
    } catch (error: any) {
      return respondWithError(error, thunkAPI);
    }
  }
)

export const update = createAsyncThunk(
  'concept/update',
  async (id, thunkAPI) => {
    try {
      return await conceptService.update(id)
    } catch (error: any) {
      return respondWithError(error, thunkAPI);
    }
  }
)

export const remove = createAsyncThunk(
  'concept/remove',
  async (id, thunkAPI) => {
    try {
      return await conceptService.remove(id)
    } catch (error: any) {
      return respondWithError(error, thunkAPI);
    }
  }
)

const onPending = (state: any) => {
  state.isLoading = true
}

const onFulfilled = (state: any, action: any) => {
  state.isLoading = false
  state.isSuccess = true
  state.user = action.payload
}

const onRejected = (state: any, action: any) => {
  state.isLoading = false
  state.isError = true
  state.message = action.payload
  state.concepts = []
}

export const conceptSlice = createSlice({
  name: 'concept',
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
      .addCase(getAll.pending, onPending)
      .addCase(getAll.fulfilled, onFulfilled)
      .addCase(getAll.rejected, onRejected)
      .addCase(add.pending, onPending)
      .addCase(add.fulfilled, onFulfilled)
      .addCase(add.rejected, onRejected)
      .addCase(update.pending, onPending)
      .addCase(update.fulfilled, onFulfilled)
      .addCase(update.rejected, onRejected)
      .addCase(remove.pending, onPending)
      .addCase(remove.fulfilled, onFulfilled)
      .addCase(remove.rejected, onRejected)


  },
})

export const authActions = {...conceptSlice.actions, getAll, add, update, remove}