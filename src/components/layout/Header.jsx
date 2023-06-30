import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';
import { loginState } from '../state/loginState';
import { useRecoilState } from 'recoil';
function Header() {
    const [loginData, setLoginData] = useRecoilState(loginState);


    return (
        <header>
            <div className={style.headerWrap}>
                <div style={{ width: '50px' }}></div>
                <div className={style.topHeader}>

                    <div className={style.logoCenter}>
                        <Link to='/'><div className={style.mainLogo}><img src='./assets/imgs/logo.png' alt='logo' /></div></Link>
                    </div>
                </div>
                <div className={style.iconRight}>
                    <li>

                        <div className={style.icon}>
                            <Link to='/mypage'><img src='./assets/imgs/user.png' /></Link></div>

                    </li>
                    <li>

                        <div className={style.icon}>
                            <Link to='/cart'><img src='./assets/imgs/cart.png' /></Link></div>

                    </li>
                </div>

            </div>


        </header>
    );
}

export default Header;