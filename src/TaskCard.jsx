import React from 'react'
import './TaskCard.scss'
// import { Timestamp } from 'firebase/firestore';

export default function TaskCard({ title, description, _date0, _date1, id, setFase }) {
    let curDate = new Date()
    let ratio = (Math.round((curDate-_date0)/(1000 * 60 * 60 * 24))   /  (Math.round((_date1-_date0)/(1000 * 60 * 60 * 24))+1) )
    // console.log("meu titulo é ", title)
    // console.log("meu id é ", id)
    // console.log("dias restantes do "+ title)
    // console.log(Math.round( (curDate-_date0)/(1000 * 60 * 60 * 24)))
    // console.log("/")
    // console.log(Math.round((_date1-_date0)/(1000 * 60 * 60 * 24)) +1  )
    // console.log("=")
    // console.log(ratio)
    return (
        <button className='task'
        onClick={() =>  {setFase("editCard/"+id)
        console.log(id)        
    }
}
        >
            <h2>{title}</h2>
            {description !== null && description !== '' &&
                <p className='description'>
                    {description} 
                </p>
            } 
            <div className='progress'>
                
                <span className='progress-bar'>
                    <span className='progress-bar-fill' style={{
                        width: ratio*100+'%'
                    }}></span>
                </span>
<p>{_date0.getDate()} / {_date0.getMonth() + 1} / {_date0.getFullYear()} até {_date1.getDate()} / {_date1.getMonth() + 1} / {_date1.getFullYear()}</p>
            </div>
        </button>
    )
}
