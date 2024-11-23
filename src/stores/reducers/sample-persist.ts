import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SamplePersistState {
  version: number;
}

const initialState = { version: 0 } as SamplePersistState;

const sampleSlice = createSlice({
  name: 'sample-persist',
  initialState,
  reducers: {
    updateValue(state: SamplePersistState, action: PayloadAction<number>) {
      state.version = action.payload;
    },
  },
});

export const { updateValue } = sampleSlice.actions;
export default sampleSlice.reducer;
