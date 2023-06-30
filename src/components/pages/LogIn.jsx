import React, { useEffect, useState } from 'react';
import style from './LogIn.module.css'
import { loginState } from '../state/loginState';
import { useRecoilState } from 'recoil';
import {Link, useNavigate} from 'react-router-dom';

function LogIn() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState("");
    const[emailValid, setEmailValid] = useState(false);
    const[pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    const [loginData, setLoginData] = useRecoilState(loginState);
    const navigate = useNavigate();
    useEffect(() => {
        if(emailValid && pwValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
      }, [emailValid, pwValid]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex =
          /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
          setEmailValid(true);
        } else {
          setEmailValid(false);
        }
      };

      const handlePw = (e) => {
        setPw(e.target.value);
        const regex =
          /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
          setPwValid(true);
        } else {
          setPwValid(false);
        }
      };

      const onClickConfirmButton = () => {
        fetch(`http://localhost:3001/users?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if (data.length != 0) {
                if (data[0].password === pw) {
                    // setLoginData(data[0]); // 로그인 성공 시 loginData는 false 에서 {id: 1, email: ~~, name: '유하경',...}
                    setLoginData({
                      ...loginData,
                      userId: data[0].id,
                      userName: data[0].name,
                      userEmail: data[0].email,
                      isLogin: true,
                    })
                    alert('로그인에 성공했습니다.');
                    navigate('/')
                    
                } else {
                    alert('비밀번호가 틀렸습니다.');
                }
            } else {
                alert("등록되지 않은 회원입니다.");
            }
        });
    //    
      }
      const token = window.location.href.split('?token=')[1];
      useEffect(() => {
        if (token) localStorage.setItem('4242-token', token);
        if (localStorage.getItem('4242-token')) setLoginData(true);
      }, []);

      
      

    return (<div className={style.page}>
        <div className={style.titleWrap}>
            로그인
        </div>
        <div className={style.contentWrap}>
            <div className={style.inputTitle}>이메일 주소</div>
            <div className={style.inputWrap}>
                <input className={style.input}
                    type='text'
                    placeholder="test@gmail.com"
                    value={email}
                    onChange ={handleEmail} 
                    />
            </div>
            <div className={style.errorMessageWrap}>
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
            </div>

            <div className={style.inputTitle} style = {{marginTop:"26px"}
        }>비밀번호</div>
            <div className={style.inputWrap}>
                <input 
                type='password'
                className={style.input}
                 placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                 value={pw}
              onChange={handlePw}
                 
                 />
            </div>
            <div className={style.errorMessageWrap}>
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
                
            </div>
        </div>
              
        <div>
            <button onClick={onClickConfirmButton} disabled = {notAllow} className={style.bottomButton}>확인</button>
        </div>
        <div className={style.loginSupport}>
                  <span >
                    <Link to = '/join'>회원가입  &nbsp; </Link>
                  </span>
                 
              </div>
    </div>);
}

export default LogIn;