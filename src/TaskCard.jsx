import React from 'react'
import './TaskCard.scss'

export default function TaskCard({ title, description, _date0, _date1, id, setFase }) {
    let curDate = new Date()
    let ratio = (Math.round((curDate-_date0)/(1000 * 60 * 60 * 24))   /  (Math.round((_date1-_date0)/(1000 * 60 * 60 * 24))+1) )
    
    const diasRestantes = Math.round((_date1-_date0)/(1000 * 60 * 60 * 24))+1-Math.round((curDate-_date0)/(1000 * 60 * 60 * 24))
    
    return (
        <button className='task'
        onClick={() =>  {
            setFase("editCard/"+id)
        }}>
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
                    <h3>{diasRestantes} dia{diasRestantes>1?'s':''} restante{diasRestantes>1?'s':''}</h3>
<p>{_date0.getDate()} / {_date0.getMonth() + 1} / {_date0.getFullYear()} até {_date1.getDate()} / {_date1.getMonth() + 1} / {_date1.getFullYear()}</p>
            </div>
        </button>
    )
}
