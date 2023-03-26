import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

import React, { useEffect, useState } from 'react'
import './EditCard.scss'


import { db, auth } from "./firebase";

async function uploadCard(card) {
    // console.log(card.id)
    // console.log(auth.currentUser.uid)
    const cardRef = doc(db, auth.currentUser.uid, card.id);
    await setDoc(cardRef, {
    card: {
        title: card.title,
        description: card.description,
        _date0: card._date0,
        _date1: card._date1
    },
    done: false
    }
    );
}

async function getCard(id) {
    // console.log(id)
    const docRef = doc(db, auth.currentUser.uid, id);
    const docSnap = await getDoc(docRef);
    // let data = docSnap.data().card
    return docSnap.data().card
}


export default function EditCard({setFase, id}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    let _curDate = new Date()
    _curDate.setHours(0,0,0,0)
    
    const [date0, setDate0] = useState(`${_curDate.getFullYear()}-${_curDate.getMonth()+1<10&&'0'}${_curDate.getMonth()+1}-${_curDate.getDate()}`)
    const [date1, setDate1] = useState(`${_curDate.getFullYear()}-${_curDate.getMonth()+1<10&&'0'}${_curDate.getMonth()+1}-${_curDate.getDate()}`)
    
    
    const [_date0,_setDate0] = useState(new Date())
    const [_date1,_setDate1] = useState(new Date())
    
    useEffect(() => {
        getCard(id).then((card) => {
            setTitle(card.title)
            setDescription(card.description)
            
            _setDate0(card._date0.toDate())
            setDate0(`${card._date0.toDate().getFullYear()}-${card._date0.toDate().getMonth()+1<10&&'0'}${card._date0.toDate().getMonth()+1}-${card._date0.toDate().getDate()}`)
                
            _setDate1(card._date1.toDate())
            setDate1(`${card._date1.toDate().getFullYear()}-${card._date1.toDate().getMonth()+1<10&&'0'}${card._date1.toDate().getMonth()+1}-${card._date1.toDate().getDate()}`)
            
            })
    },[])
    


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
            _date1: _date1,
            id: id
        }

        const result = testData(card)
        if (result === 'ok') {
            uploadCard(card).then(setFase("feed"))
            document.location.reload(true)
        }else{
            alert(result)
        }
    }
    const cancel = () => {
        setFase("feed")
    }
    const deleteCard = () => {
        deleteDoc(doc(db, auth.currentUser.uid, id)).then(() =>{
            setFase("feed")
            document.location.reload(true)
        })
    }

    return (
        <div className='EditCard'>
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
                <button onClick={cancel}>Cancelar</button>
                <button onClick={handleSubmit}>Salvar alteração</button>
            </div>
            <button className='delete' onClick={deleteCard}>
                Deletar card
            </button>
        </div>
    )
}