import React, { useEffect, useState } from 'react'
import './Home.scss'
import Feed from './Feed';



export default function Home() {
  return ( 
    <div className='Home'>
      <Feed />
    </div>
  )
}
