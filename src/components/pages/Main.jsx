import React from 'react';
import EventList from '../ui/EventList';
import ProductList from '../ui/ProductList';

import style from './Main.module.css'


function Main() {
    return ( 
    <div className={style.mainContain}>
        <EventList />
        < ProductList/>
    </div>);
}

export default Main;