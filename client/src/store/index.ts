import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter'



export const store = configureStore({
  reducer: {
    count: counterReducer,
  },
})

// 저장소 자체에서 `RootState` 및 `AppDispatch` 유형을 추론합니다.
export type RootState = ReturnType<typeof store.getState>
// 유추된 유형 : {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch