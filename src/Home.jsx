import React from 'react'
import './Home.scss'
import TaskCard from './TaskCard'

export default function Home() {
  return ( 
    <div className='Home'>
        <div className='feed'>
            <TaskCard
                title = "uma tarefa ai"
                description = ""
                date0={'19/3/2023'}
                date1={'22/3/2023'}
            />
            <TaskCard
                title = "uma tarefa ai"
                description = "descrição da tarefa essa é uma tarefa que é complicada e muito difícil "
                date0={'19/3/2023'}
                date1={'21/3/2023'}
            />
        </div>
    </div>
  )
}
