import React from 'react'
import './TaskCard.scss'

export default function TaskCard({ title, description, date0, date1 }) {
    let _date0 = new Date(
        parseInt(date0.split('/')[2]),
        parseInt(date0.split('/')[1])-1,
        parseInt(date0.split('/')[0])-1
        )
    let _date1 = new Date(
        parseInt(date1.split('/')[2]),
        parseInt(date1.split('/')[1])-1,
        parseInt(date1.split('/')[0])
        )
    let curDate = new Date()
    let ratio = ( Math.round((curDate-_date0)/(1000 * 60 * 60 * 24))/Math.round((_date1-_date0)/(1000 * 60 * 60 * 24)) )
    return (
        <button className='task'>
            <h2>{title}</h2>
            {description !== null && description !== '' &&
                <p className='description'>
                    {description} 
                </p>
            }
            <div className='progress'>
                <p>{date0}</p>
                <span className='progress-bar'>
                    <span className='progress-bar-fill' style={{
                        width: ratio*100+'%'
                    }}></span>
                </span>
                <p>{date1}</p>
            </div>
        </button>
    )
}
