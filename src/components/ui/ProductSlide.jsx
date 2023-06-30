import React from 'react';
import { Link } from 'react-router-dom';
import style from './ProductSlide.module.css'



function ProductSlide({ product }) {
    return (
        

        <div className={style.itemWrap}>
            <Link to= {`/product-detail/${product.id}`} >
                <div className={style.item}>
                    <div className={style.thumbnailImg}>
                        <img src={product.thumbnail} alt={product.name} />
                        </div>
                </div>
            </Link>
            <div className={style.productName}>
                {product.name}
            </div>
            <h3 className={style.price}>
                {product.price}원
            </h3>
        </div>






    )
}

export default ProductSlide;