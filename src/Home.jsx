import React, { useEffect, useState } from 'react'
import './Home.scss'
import Feed from './Feed';
import CreateNewCard from './CreateNewCard';



export default function Home() {
  const [fase,setFase] = useState("feed")
  return ( 
    <div className='Home'>
      {fase == "feed" && 
      <>
        <Feed />  
        <button className='newCard'
          onClick={()=>setFase('newCard')}
          >
          +
        </button>
      </>
      }
      {fase == "newCard" && 
        <>
          <CreateNewCard />
        </>
      }

    </div>
  )
}
