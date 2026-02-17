import { useState } from 'react'
import './SubmitPage.css'

export default function SubmitPage() {

  const [flag, setFlag] = useState(false)
  const [message, setMessage] = useState('')
  const [category, setCategory] = useState('')

  async function sendComlaint() {

    const res = await fetch('http://localhost:3002/api/complaints', {

      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message, category})
    })

    const data = await res.json()
    setFlag(true)
    

  }

  return (
    <div id='complaint'>
      <div className='submit-page'>Submit Complaint Page</div>
      <div className='send-div'>
        <h1>שליחת תלונה אנונימית</h1>
        <div className='select-div'>
          <label htmlFor="select"> :תחום התלונה</label>
          <select lang='he' dir="rtl" id="select" onChange={e => setCategory(e.target.value)}>
            <option value="" disabled selected hidden></option>
            <option value="food">אוכל</option>
            <option value="equipment">ציוד</option>
            <option value="orders">פקודות</option>
            <option value="else">אחר</option>
          </select>
        </div>
        <div className='content-div'>
          <label htmlFor="content"> :תוכן התלונה</label>
          <textarea onChange={e => setMessage(e.target.value)} lang='he' dir="rtl" rows={3} id="content" placeholder='כתוב כאן את התלונה שלך...'></textarea>
        </div>
        <button onClick={sendComlaint} id='sent-complaint'>שליחה</button>
        {flag && <><div id='sended'>! התלונה נשלחה בהצלחה</div></>}
      </div>
    </div>
  )
}

