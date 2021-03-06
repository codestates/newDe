import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Board, ContentView, Landing, Login, MainBoard, MyPage, MyPageEdit, RoadMap, SignUp, Writing, Callback, Admin, Test } from './pages'
import { Nav, AlertModal, Footer } from './component';
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components';
import theme from './style/theme';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react'
import { RootState } from './store'
import { useAppSelector, useAppDispatch } from './store/hooks'
import { setLogin, setOauth, setAdmin, setNickname } from './features/info';
import axios from 'axios';
import { apiURL } from './url'
import { Outlet, Navigate } from 'react-router';
import Loader from './component/Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';


const ContentWrap = styled.div`
  display: flex;`

function App() {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true);
  const isLogin = useAppSelector((state: RootState) => state.info.login)
  const isAdmin = useAppSelector((state: RootState) => state.info.admin)
  const [alertOpened, setAlert] = useState(false)
  const cookies = new Cookies();
  const [modalMessage, setMessage] = useState('')

  const accessToken = cookies.get("accessToken")

  useEffect(() => {
    AOS.init();
    if (accessToken) {
      // console.log(accessToken)
      axios.get(`${apiURL}/user`, config)
    .then(el => {
      dispatch(setLogin(true))
      dispatch(setNickname(el.data.data.nickname))
      if(el.data.data.kakao){
        dispatch(setOauth(true))
      }
      if(el.data.data.admin){
        dispatch(setAdmin(true))
      }
      setIsLoading(false);
    })
    .catch(() =>{
      // console.log(el.response)
      setIsLoading(false)
    }  
    )    
    }
    else setIsLoading(false);
  }, [])




  
  function alerthandler () {
    setAlert(false)
  }

  function PrivateRoute() {
    useEffect(()=>{
      if(!isLogin) {
        setAlert(true);
        setMessage('???????????? ????????? ??????????????????.')}

    }, []);
    return isLogin ? <Outlet /> : <Navigate replace to='/login' />;
  }
 
  function AdminPrivate() {
    return isAdmin ? <Outlet /> : <>{setTimeout(() => {
      setAlert(true);
      setMessage('????????? ????????????.')
    }, 0)}<Navigate replace to='/' /></>;
  }
  if (isLoading) return <Loader type="spin" color="#999999" />
  return (
    <div className="App">

      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Nav />
          <ContentWrap>
            
          <Routes>
            <Route path='/board' element={<Board />} />
            <Route path='/mainboard' element={<MainBoard />} />
            <Route path='/:id' element={<ContentView />} />
            <Route path='/login' element={<Login />} />
            <Route path='/mypage/*' element={<PrivateRoute />}>
              <Route path='' element={<MyPage />} />
            </Route>
            <Route path='/mypageedit' element={<PrivateRoute />}>
              <Route path='' element={<MyPageEdit />} />
            </Route>
            <Route path='/signup' element={<SignUp />} />

            <Route path='/writing' element={<PrivateRoute />}>
              <Route path='' element={<Writing />} />
              <Route path=':contentId' element={<Writing />} />
            </Route>    

            <Route path='/roadmap' element={<RoadMap />} />
            <Route path='/callback' element={<Callback />} />
            <Route path='/admin' element={<AdminPrivate />}>
              <Route path='' element={<Admin />} />
            </Route>
            <Route path='/' element={<Landing />} />
            <Route path='/test' element={<Test />} />
            {/* <Route path='/admin' element={<Admin />} /> */}
            
          </Routes>
          
          {/* ?????? ?????? ????????? ??????????????? ???????????? ?????????  */}
          {alertOpened ? <AlertModal message = {modalMessage} modalhandler = {alerthandler} />: null}
          </ContentWrap>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>

    </div>
  );
}

export default App

