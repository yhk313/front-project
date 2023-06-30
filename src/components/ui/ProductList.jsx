import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './ProductList.module.css'
import ProductSlide from './ProductSlide';
function ProductList() {
    const[productData, setProductData] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3001/products')
        .then(res =>res.json())
        .then(data => {
            console.log(data);
            setProductData(data);
        })
        .catch(err=>{
            console.error(err);
        })
    },[])
    console.log(productData);
    
    
    return ( 
    
        
        <section className={style.productSection}>
            
                <div className={style.productTitle}>
                    <h1 className={style.sectionName}>전체 상품</h1>
                    
                </div>
                
                    <div className={style.productItemSliderWrap}>
                        <div className={style.productList}>
                            {
                                productData && productData.map(product =>(
                                    <ProductSlide
                                        key={product.id}
                                        product = {product}/>
                                    


                                    
                                ))
                            }
                        </div>
                           

                    </div>  
             
            
        </section>  
        
   );
}

export default ProductList;