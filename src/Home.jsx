import React, { useEffect, useState } from 'react'
import './Home.scss'
import Feed from './Feed';
import CreateNewCard from './CreateNewCard';



export default function Home( {signOut} ) {
  const [fase,setFase] = useState("feed")
  return ( 
    <div className='Home'>
      <div className='header'>
        <button onClick={signOut} className="sign-out" type="button">
          sair
        </button>
      </div>
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
          <CreateNewCard 
          setFase={setFase}
          />
        </>
      }

    </div>
  )
}
