import { async } from '@firebase/util'
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import './CreateNewCard.scss'


import { db, auth } from "./firebase";

async function uploadCard(card) {
  // var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
 
  
  const newCardRef = doc(collection(db, auth.currentUser.uid));
  await setDoc(newCardRef, {
    card: {
      title: card.title,
      description: card.description,
      _date0: card._date0,
      _date1: card._date1
    },
    done: false
  });
}




export default function CreateNewCard({setFase}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  
  let _curDate = new Date()
  // console.log(Timestamp.fromDate(_curDate))
  _curDate.setHours(0,0,0,0)
  
  const [date0, setDate0] = useState(`${_curDate.getFullYear()}-${_curDate.getMonth()+1<10&&'0'}${_curDate.getMonth()+1}-${_curDate.getDate()}`)
  const [date1, setDate1] = useState(`${_curDate.getFullYear()}-${_curDate.getMonth()+1<10&&'0'}${_curDate.getMonth()+1}-${_curDate.getDate()}`)

  
  const [_date0,_setDate0] = useState(new Date())
  const [_date1,_setDate1] = useState(new Date())

  
  


  const handleTitleChange = (e) => {
    if(title.length < 30 ||
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


  const testData = (card) => {
    if (card.title === '') return 'Coloque um título válido!'
    if (_curDate > _date1) return 'A data final já passou!'
    if (_date0 > _date1) return 'A data de início não pode ser depois da data final!'
    return 'ok'
  }


  const handleSubmit = () => {
    const card = {
      title: title,
      description: description,
      _date0: _date0,
      _date1: _date1
    }

    const result = testData(card)
    if (result === 'ok') {
      console.log("title: ",title);
      console.log("description: ",description);
      console.log("Timestamp _date0: ",Timestamp.fromDate(_date0));
      console.log("Timestamp _date1: ",Timestamp.fromDate(_date1));  
      uploadCard(card).then(setFase("feed"))
    }else{
      alert(result)
    }
  }
  const cancel = () => {
    setFase("feed")
  }

  return (
    <div className='CreateNewCard'>
        <form >
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
        <div className='buttons'>
          <button onClick={handleSubmit}>Criar card</button>
          <button onClick={cancel}>Cancelar</button>
        </div>
    </div>
  )
}
