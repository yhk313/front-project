import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddCart from '../ui/AddCart';
import style from './ProductDetail.module.css';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [count, setCount] = useState(1);
    const [isCheck, setIsCheck] = useState(false);

    
    useEffect(() => {
        console.log(id);
        fetch(`http://localhost:3001/products/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProduct(data)
            })
            .catch(err => console.log(err))
    }, [id]);

    const handleQty = (type) =>{
        if(type==="plus"){
            setCount((count+1));
        }else{
            if(count===1) return alert("최소 수량은 1개 입니다.");
            setCount((count-1));
        }

    };




    return (<>
        {
            product && (
                <div>
                    <section className={style.proInfoContents}>
                        <Link to='/'>
                            <div className={style.btnBack}>
                                <img src={`${process.env.PUBLIC_URL}/assets/imgs/backBtn.png`} alt='이전페이지' />
                            </div>
                        </Link>
                        <div className={style.proImg}><img src={product.thumbnail} alt="이미지" /></div>
                        <div className={style.proInfo}>
                            <div className={style.proHeader}>
                                <h3 className={style.proName}>{product.name}</h3>
                                <div className={style.RatingBox}>
                                    <div className={style.proStarImg}>
                                        <img src={`${process.env.PUBLIC_URL}/assets/imgs/star.png`} alt='별점' /></div>
                                    <span className={style.proRating}>{product.rating}</span>

                                </div>
                            </div>

                            <div className={style.price}>
                                <span className={style.proPrice}>{product.price*count}</span>
                                <p>원</p>


                            </div>
                            <div className={style.supportQty}>
                            <img className={style.buttonMinus} onClick={()=>handleQty("minus")}  src={`${process.env.PUBLIC_URL}/assets/imgs/minus.png`} />
                            <div className={style.cartTxtQty}>{count}</div>
                            <img className={style.buttonPlus} onClick={()=>handleQty("plus")} src={`${process.env.PUBLIC_URL}/assets/imgs/plus.png`} />
                            </div>
                            <AddCart
                                
                                product={product}
                                qty = {count}
                                isCheck = {isCheck}
                                setIsCheck = {setIsCheck} />


                        </div>
                    </section>
                    <section className={style.proDetailContents}>
                        <div className={style.infoTitle}>
                            <span>상품정보</span>
                        </div>
                        <table rules="rows" className={style.infoDesc}>

                            <tbody>
                                <tr>
                                    <th>상표</th>
                                    <td>{product.brand}</td>
                                </tr>
                                <tr>
                                    <th>상품 설명</th>
                                    <td>{product.description}</td>
                                </tr>
                            </tbody>
                        </table>


                    </section>


                </div>
            )
        }
    </>);
}

export default ProductDetail;