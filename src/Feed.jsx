import React, { useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import './Feed.scss'

import { db, auth } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";


async function getCards() {
    const q = query(collection(db, auth.currentUser.uid), where("done", "==", false));
    const querySnapshot = await getDocs(q);
    const result = []
    querySnapshot.forEach((doc) => {
        result.push(doc.data().card)
    });
    return result
}
export default function Feed() {
    const [cards, setCards] = useState([])
    useEffect(()=>{
      getCards().then((data) => setCards(data))
    },[])
    return (
        <div className='Feed'>
            {cards.map((data)=>
                <TaskCard
                key={data.title}
                title = {data.title}
                description = {data.description}
                date0={data._date0}
                date1={data._date1}
                />
            )}
        </div>
    )
}
