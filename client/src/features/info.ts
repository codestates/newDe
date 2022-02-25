import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface infoState {
  parent:string
  child:string
}

const initialState = {
  parent:'',
  child:''
} as infoState

export const info = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setParent:(state,action:PayloadAction<any>)=>{
      state.parent= action.payload
    },
    setChild:(state,action:PayloadAction<any>)=>{
      state.child=action.payload
    } 
  },
})

export const { setParent,setChild } = info.actions

export default info.reducer