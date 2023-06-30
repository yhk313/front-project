import React, { useEffect, useState } from 'react';
import CartHeader from '../ui/CartHeader';
import CartList from '../ui/CartList';
import style from './CartPage.module.css';
import { useRecoilState } from 'recoil';
import { loginState } from '../state/loginState';
function CartPage() {
    const [cartDatas, setCartDatas] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [loginData, setLoginData] = useRecoilState(loginState);
    const userId = loginData.userId;
    useEffect(() => {
        fetch(`http://localhost:3001/carts?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setCartDatas(data)
        });
    },[isDelete,userId]);

    console.log(cartDatas)
    return ( 
    <div className={style.cartContents}>
        <CartHeader />
        {
            cartDatas && cartDatas.map(cartData =>(
                
                <CartList
                key = {cartData.id}
                cartData = {cartData}
                isDelete = {isDelete}
                setIsDelete ={setIsDelete}/>
            ))
        }
    </div> );
}

export default CartPage;