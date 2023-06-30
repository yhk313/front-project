import React from 'react';
import style from './Mypage.module.css'
import { loginState } from '../state/loginState';
import { useRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import LogIn from './LogIn';

function Mypage() {
    
    const [loginData, setLoginData] = useRecoilState(loginState);
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem('4242-token');
        setLoginData({});
        navigate('/');
      };

    return (
        <div className={style.mypageContents}>
            { loginData.isLogin ? 
                <>               
                <p>{loginData.userName}님 안녕하세요</p> 
                <div><button onClick={logoutHandler}>로그아웃</button></div>
                </>

                :
                <LogIn />
            }
            
            
        </div>
    );
}

export default Mypage;
