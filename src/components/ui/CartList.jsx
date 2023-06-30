import React, { useEffect } from 'react';
import { useState } from 'react';
import style from './CartList.module.css'

function CartList({ cartData,isDelete, setIsDelete}) {
    console.log(cartData)
    
    const [cartObj, setCartObj] = useState(
        {
            id: cartData.id,
            userId: cartData.userId,
            productId: cartData.productId,
            productThumbnail: "",
            productName: "",
            productCategory: "",
            productPrice: cartData.qty,
            qty: cartData.qty,
            isCheck: cartData.isCheck
            
        }
    )
   

    const url = `http://localhost:3001/products/${cartData.productId}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCartObj({
                    ...cartObj,
                    productThumbnail: data.thumbnail,
                    productName: data.name,
                    productCategory: data.category,
                    productPrice : data.price
                })

            })
    }, [])
    


    const handleQtyPatch = (qty) => {
        fetch(`http://localhost:3001/carts/${cartObj.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            qty: qty

          })
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
      }
    
    const handleQty = (type) =>{
        if(type==="plus"){
            setCartObj({
                ...cartObj,
                qty: cartObj.qty + 1
            });
            handleQtyPatch(cartObj.qty + 1);
        }else{
            if(cartObj.qty===1) return alert("최소 수량은 1개 입니다.")
            setCartObj({
                ...cartObj,
                qty: cartObj.qty- 1
            });
            handleQtyPatch(cartObj.qty - 1);
        }

    };
   
   
      console.log(cartObj)
    const handleDelete = () => {
        if(window.confirm("삭제하시겠습니까?")){
        fetch(`http://localhost:3001/carts/${cartObj.id}`, {
          method: "DELETE",
        }).then(res => {
          console.log(res)
          setIsDelete(!isDelete)
        })
        .catch(err => console.log(err))
      }
      }

      
    



    return (<div className={style.cartListCardWrap}>
        <div className={style.cartArea}>
            <div className={style.cartThmb}>
                
                <div className={style.cartImg}>
                    <img src={cartObj.productThumbnail} alt="상품이미지"></img>
                </div>
            </div>
            <div className={style.cartCont}>
                <div className={style.cartContHead}>
                    <div className={style.cartCat}>{cartObj.productCategory}</div>
                    <div className={style.cartDel}><img  src={`${process.env.PUBLIC_URL}/assets/imgs/x.png`} onClick={handleDelete}/></div>
                </div>
                <div className={style.cartTit}>
                <p className={style.cartName}>{cartObj.productName}</p>
                </div>
                <div className={style.cartPay}>
                    <em className={style.cartPrice}>{cartObj.productPrice * cartObj.qty}&nbsp;원</em>
                    <div className={style.cartQty}>
                        
                        <img className={style.buttonMinus} onClick = {()=>handleQty("minus")}src={`${process.env.PUBLIC_URL}/assets/imgs/minus.png`} />
                        <div className={style.cartTxtQty}>{cartObj.qty}</div>
                        <img className={style.buttonPlus} onClick = {()=>handleQty("plus")}  src={`${process.env.PUBLIC_URL}/assets/imgs/plus.png`} />
                    </div>
                </div>

            </div>
        </div>

    </div>);
}

export default CartList;
