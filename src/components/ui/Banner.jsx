import React from 'react';
import style from './Banner.module.css'
function Banner() {
    return ( 
    <div className={style.mainContain}>
        <div className={style.mainBanner}>
            <img src = './assets/imgs/banner1.png'/>
        </div>
        <div className={style.indexPoint}>
            <div className={style.pointerBar}>
                <span className={style.poinFill}>

                </span>
            </div>

        </div>

    
    </div>
    )
}

export default Banner;