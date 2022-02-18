import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  id: number
  isLogin?: boolean
}

const initialState = {
  value: 0,
  id: 1,
  isLogin: false,
} as CounterState

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
      state.id += 2
    },
    decrement: (state) => {
      state.value -= 1
      state.id -= 2
    },
    
    amount: (state, action: PayloadAction<CounterState>) => {
      state.value = action.payload.value
      state.id = action.payload.id
    },
  },
})

export const { increment, decrement, amount } = counterSlice.actions

export default counterSlice.reducer