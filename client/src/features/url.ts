import { createSlice } from '@reduxjs/toolkit'

export interface UrlState {
    url:string
  }
  
  const initialState = {
    url:'http://localhost:4000'
  } as UrlState
  
  export const url = createSlice({
    name: 'url',
    initialState,
    reducers: {},
  })
  
  export default url.reducer