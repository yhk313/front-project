import React, { useEffect, useState } from 'react';
import style from './ProductCard.module.css'
import { Link } from 'react-router-dom';

function ProductCard({productId}) {

  const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/products/${productId}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        setData(data);
    })
    .catch(err => {
        console.error(err);
    })
  },[productId])

  return (
    <div className={style.eventItemWrap}>
      {
        data && 
        <>
          <Link to={`/product-detail/${data.id}`}>
            <div className={style.eventItem}>
                <div className={style.eventThumbnailImg}>
                    <img src={data.thumbnail} />
                </div>
            </div>
          </Link>
          <div className={style.eventItemName}>{data.name}</div>
          <h3 className={style.eventItemPrice}>{data.price}원</h3>
        </>
      }
        
    </div>
  )
}

export default ProductCard;