import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import './Feed.scss'

import { db, auth } from "./firebase";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";



async function getCards() {
    const q = query(collection(db, auth.currentUser.uid), where("done", "==", false));
    const querySnapshot = await getDocs(q);
    const result = []
    querySnapshot.forEach((doc) => {
        let data = doc.data().card
        data.id = doc.id;
        // console.log(data.title)
        // console.log(data.id)
        result.push(data)
    });
    console.log("pegou data")
    return result
}
export default function Feed({ setFase }) {
    const [cards, setCards] = useState([])
    useEffect(()=>{
      getCards().then((data) => setCards(data))
    },[])
    return (
        <div className='Feed'>
            {cards.map((data,i)=>
                <TaskCard
                key={i}
                id={data.id}
                title = {data.title}
                description = {data.description}
                _date0={data._date0.toDate()}
                _date1={data._date1.toDate()}
                setFase={setFase}
                />
            )}
        </div>
    )
}
