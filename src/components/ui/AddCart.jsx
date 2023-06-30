import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import style from './AddCart.module.css';
import { useRecoilState } from 'recoil';
import { loginState } from '../state/loginState';
function AddCart({product, qty, isCheck, setIsCheck}) {
  const [loginData, setLoginData] = useRecoilState(loginState);
  console.log(loginData.userId)
    const navigate = useNavigate();
    const handleAddCart = () =>{
      const userId = loginData.userId;
        // const cartItem = {
        //     id: product.id,
        //     image:product.thumbnail,
        //     name:product.name,
        //     price: product.price,
        // };
       
        // console.log(cartItem)
        // setCart([...cart, cartItem]);
        // console.log(cart);
        fetch('http://localhost:3001/carts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              productId: product.id,
              qty: qty,
              userId: userId,
              isCheck: isCheck
            })
          })
          .then(res => {
            res.json();
            if(res.ok){
              window.alert('장바구니에 담겼습니다');
              navigate('/cart');
              // console.log(res);
            }
          })
          .catch(err => console.error(err));
          }

    
    
    
    
    
    return ( 
        <div className={style.cart}>
                                    <button onClick={handleAddCart}>장바구니 담기</button> 
                            </div>
     );
}

export default AddCart;