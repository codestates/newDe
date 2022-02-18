//마이페이지 수정 
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


function MyPageEdit () {


  
    return (

        <div>
          <div>
            <input type='email' placeholder='email' disabled />
            <input type='text' placeholder='nickname' />
            <input type='password' placeholder='password' />
          </div>
          <br />
          <div>
            <button className='modifyBtn' >수정</button>
            <span style={{ color: 'red' }}></span>
          </div>
        </div>

    );
  }

export default MyPageEdit
