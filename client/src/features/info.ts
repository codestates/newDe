import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface infoState {
  parent:string
  child:string
  login:boolean
  oauth:boolean
  nickname:string
  manager:boolean
}

const initialState = {
  parent:'',
  child:'',
  login:false,
  oauth:false,
  nickname:'',
  manager:false
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
    },
    setOauth:(state,action:PayloadAction<any>)=>{
      state.oauth=action.payload
    },
    setNickname:(state,action:PayloadAction<any>)=>{
      state.nickname=action.payload
    },
    setManager:(state,action:PayloadAction<any>)=>{
      state.manager=action.payload
    },
  },
})

export const { setParent,setChild,setLogin,setOauth ,setNickname,setManager} = info.actions

export default info.reducer