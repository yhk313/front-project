import React, { useState } from 'react';
import { useEffect } from 'react';
import style from './EventList.module.css'

import ProductCard from './ProductCard';
function EventList() {

    const [eventList, setEventList] = useState();
    const [eventProductList, setEventProductList] = useState();
    const [eventTitle, setEventTitle] = useState();

    useEffect(() => {
        fetch('http://localhost:3001/events')
        .then(res => res.json())
        .then(data => {
            setEventList(data);
        })
        .catch(err => {
            console.error(err);
        })
        getEventData(1)

    }, []);

    const getEventData = ( eventId ) => {

        fetch(`http://localhost:3001/events/${eventId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            setEventTitle(data.name)
            setEventProductList(data.eventProductList);

        })
        .catch(err => {
            console.error(err);
        })
    }



    return (
        <section className={style.eventSection}>
            <div className={style.eventWrap}>
                <div className={style.eventTitle}>

                    <h1 className={style.eventName}>이벤트 {eventTitle}</h1>

                </div>
                <ul className={style.categories}>
                    {
                        eventList && eventList.map((event) =>
                            <li className={style.category}>


                                <button className={style.categoryBtn} onClick={()=>getEventData(event.id)}>

                                    {event.name}
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className={style.eventListWrap}>
                <div className={style.eventList}>

                    {eventProductList && eventProductList.map((item, idx) => (
                        <ProductCard productId={item} key={idx}/>

                    ))}
                </div>
            </div>
        </section>



    );
}

export default EventList;