import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface infoState {
  parent:string
  child:string
  login:boolean
}

const initialState = {
  parent:'',
  child:'',
  login:false
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
    },
    setLogin:(state,action:PayloadAction<any>)=>{
      state.login=action.payload
    }
  },
})

export const { setParent,setChild,setLogin } = info.actions

export default info.reducer