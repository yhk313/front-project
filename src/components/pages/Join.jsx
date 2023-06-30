import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import style from './Join.module.css';
function Join() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState("");
    const[emailValid, setEmailValid] = useState(false);
    const[pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);
    
    const navigate = useNavigate();
    const [user, setUser] = useState();
    useEffect(() => {
        fetch(`http://localhost:3001/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUser(data)
            })
            .catch(err => console.log(err))
    }, []);


    const handleAddUser = (e) =>{
        e.preventDefault();
          fetch('http://localhost:3001/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: userName,
                email: email,
                password: pw,
              }),
              
            })
            .then(res => {
              res.json();
              if(res.ok){
                window.alert('회원가입 되었습니다.');
                navigate('/login');
                // console.log(res);
              }
            })
            .catch(err => console.error(err));
            }






    useEffect(() => {
        if(emailValid && pwValid) {
          setNotAllow(false);
          return;
        }
        setNotAllow(true);
      }, [emailValid, pwValid]);
    const handleUserName = (e) => {
        setUserName(e.target.value);
        
        
      };

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

    return ( 
        <div className={style.page}>
        <div className={style.titleWrap}>
            회원가입
        </div>
        <form className={style.contentWrap} onSubmit={handleAddUser}>
        <div className={style.inputTitle}>이름</div>
            <div className={style.inputWrap}>
                <input className={style.input}
                    type='text'
                    placeholder="홍길동"
                    value={userName}
                    onChange ={handleUserName} 
                    />
            </div>
            <div className={style.inputTitle} style = {{marginTop:"26px"}
        }>이메일 주소</div>
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
            <div>
              <button type='submit' disabled = {notAllow} className={style.bottomButton}>확인</button>
             </div>
        </form>
             
        
        
    </div>
     );
}

export default Join;