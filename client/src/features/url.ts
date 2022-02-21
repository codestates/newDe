import { createSlice } from '@reduxjs/toolkit'

export interface UrlState {
    url:string
  }
  
  const initialState = {
    url:'http://ec2-13-125-217-154.ap-northeast-2.compute.amazonaws.com'
  } as UrlState
  
  export const url = createSlice({
    name: 'url',
    initialState,
    reducers: {},
  })
  
  export default url.reducer