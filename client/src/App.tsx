import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board, ContentView, Landing, Login, MainBoard, MyPage, MyPageEdit, RoadMap, SignUp, Writing, Callback, Admin } from './pages'
import { Nav, BoardModal } from './component';
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components';
import theme from './style/theme';
import { Cookies } from 'react-cookie';
import react, { useEffect } from 'react'
import { RootState } from './store'
import { useAppSelector, useAppDispatch } from './store/hooks'
import { setLogin, setOauth, setAdmin } from './features/info';
import axios from 'axios';
import { apiURL } from './url'
import { Outlet, Navigate } from 'react-router';
import Loader from './component/Loader';




function App() {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  const ContentWrap = styled.div`
  display: flex;`
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const [isLanding, setLanding] = useState(false)
  const isLogin = useAppSelector((state: RootState) => state.info.login)
  const isAdmin = useAppSelector((state: RootState) => state.info.admin)
  const cookies = new Cookies();


  const accessToken = cookies.get("accessToken")
  const nowURL = new URL(window.location.href); //URL값 따오기 
  const path = nowURL.pathname
  console.log(path)

  useEffect(() => {
    console.log(isLanding)
    if (path === '/'){
      setLanding(true)
    }
    else {
      setLanding(false)
    }
    if (accessToken) {
      // console.log(accessToken)
      axios.get(`${apiURL}/user`, config)
    .then(el => {
      dispatch(setLogin(true))
      if(el.data.data.kakao){
        dispatch(setOauth(true))
      }
      if(el.data.data.admin){
        dispatch(setAdmin(true))
      }
      setIsLoading(false);
    })    
    }
    else setIsLoading(false);
  }, [isLanding])


  // const [isLogin, setlogin] = useState(false)

  const pathUrl = {
    landing: '/',
    board: ''
  }
  const [isModalOpened, setModal] = useState(false)
  function modalHandler() {
    setModal(!isModalOpened)
  }
  function modalCloser() {

    setModal(false)
  }

  function loginHandler() {
    dispatch(setLogin(true))
  }

  function PrivateRoute() {
    useEffect(()=>{
      if(!isLogin) alert('로그인하세욧!');
    }, []);
    return isLogin ? <Outlet /> : <Navigate replace to='/login' />;
  }
 
  function AdminPrivate() {
    return isAdmin ? <Outlet /> : <>{setTimeout(() => {
      alert('권한이 없습니다.!!!')
    }, 0)}<Navigate replace to='/' /></>;
  }
  if (isLoading) return <Loader type="spin" color="#999999" />
  return (
    <div className="App">

      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Nav modalhandler={modalHandler} modalcloser={modalCloser} />
          <ContentWrap>
            
          <Routes>
            <Route path='/board' element={<Board />} />
            <Route path='/:id' element={<ContentView />} />
            <Route path='/login' element={<Login loginhandler = {loginHandler} />} />
            <Route path='/mainboard' element={<MainBoard />} />
            <Route path='/mypage/*' element={<PrivateRoute />}>
              <Route path='' element={<MyPage />} />
            </Route>
            <Route path='/mypageedit' element={<PrivateRoute />}>
              <Route path='' element={<MyPageEdit />} />
            </Route>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/writing' element={<PrivateRoute />}>
              <Route path='' element={<Writing />} />
            </Route>
            <Route path='/roadmap' element={<RoadMap />} />
            <Route path='/callback' element={<Callback loginhandler = {loginHandler} />} />
            <Route path='/admin' element={<AdminPrivate />}>
              <Route path='' element={<Admin />} />
            </Route>
            <Route path='/' element={<Landing />} />
            {/* <Route path='/admin' element={<Admin />} /> */}
            
          </Routes>
          {isModalOpened ? <BoardModal modalHandler = {modalHandler} /> : null} 
          {/* 가장 위에 렌더링 되어야므로 마지막에 렌더링  */}
          </ContentWrap>
        </BrowserRouter>
      </ThemeProvider>

    </div>
  );
}

export default App