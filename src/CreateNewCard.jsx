import React, { useEffect, useState } from 'react'
import './CreateNewCard.scss'

export default function CreateNewCard() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  let _curDate = new Date()
  _curDate.setHours(0,0,0,0)
  
  const [date0, setDate0] = useState(`${_curDate.getFullYear()}-${_curDate.getMonth()+1<10&&'0'}${_curDate.getMonth()+1}-${_curDate.getDate()}`)
  const [date1, setDate1] = useState(`${_curDate.getFullYear()}-${_curDate.getMonth()+1<10&&'0'}${_curDate.getMonth()+1}-${_curDate.getDate()}`)

  
  const [_date0,_setDate0] = useState(new Date())
  const [_date1,_setDate1] = useState(new Date())

  
  


  const handleTitleChange = (e) => {
    if(title.length < 20 ||
       e.nativeEvent.inputType === "deleteContentBackward" || 
       e.nativeEvent.inputType === "deleteWordBackward"){
        setTitle(e.target.value)
    }
  }
  const handleDescriptionChange = (e) => {
    if(description.length < 100 ||
      e.nativeEvent.inputType === "deleteContentBackward" || 
      e.nativeEvent.inputType === "deleteWordBackward"){
        setDescription(e.target.value)
      }
  }

  const handleDateChange0 = (e) => {
    setDate0(e.target.value)
  }
  useEffect(()=>{
    if(date0.split('-').length === 3){
      _setDate0(new Date(
        parseInt(date0.split('-')[0]),
        parseInt(date0.split('-')[1])-1,
        parseInt(date0.split('-')[2]),
      ))
    }
  },[date0])

  const handleDateChange1 = (e) => {
    setDate1(e.target.value)
  }
  useEffect(()=>{
    if(date1.split('-').length === 3){
      _setDate1(new Date(
        parseInt(date1.split('-')[0]),
        parseInt(date1.split('-')[1])-1,
        parseInt(date1.split('-')[2]),
      ))
    }
  },[date1])

  return (
    <div className='CreateNewCard'>
        <form>
            <label>
                titulo:
                <input type="text" name="title" className='title'
                value={title}
                onChange={handleTitleChange}
                />
            </label>

            <label>
                Descrição:
                <textarea className='description '
                value={description}
                onChange={handleDescriptionChange}
                />
            </label>
            <label>
                Data de inicio:
                <p>(ignore para considerar a data atual)</p>
                <input
                value={date0}
                type="date"
                onChange={handleDateChange0}
                style={{
                  color: _date0 > _date1 ? 'red' : ''
                }}
                />
            </label>
            <label>
                Data final:
                <input
                value={date1}
                type="date"
                onChange={handleDateChange1}
                style={{
                  color: _curDate > _date1 ? 'red' : ''
                }}
                />
            </label>
        </form>
    </div>
  )
}
