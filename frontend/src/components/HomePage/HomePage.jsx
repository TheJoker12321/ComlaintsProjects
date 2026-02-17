import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'
import { useState } from 'react'

export default function HomePage() {

    const [password, setPassword] = useState("")
    const { token } = useContext(UserContext)
     const navigate = useNavigate()

    function moveSendMessage() {

        navigate("/message/send")

    }


    async function moveToAdmin() {


        const res = await fetch('http://localhost:3002/api/admin/login', {

            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password})
        })

        const data = await res.json()
        token.current = data["token"]
        if (token.current) {

            navigate("/admin/getMessages")
        }
    }

  return (
    <div className='home'>
        <div id='home-title'>Home Page</div>
        <div className='home-page'>
            <div className='send-message'>
                <h1>תיבת תלונות אנונימיות בבסיס צבאי</h1>
                <p>שלחו תלונה בצורה אנונימית ובטוחה</p>
                <button onClick={moveSendMessage} id='send-button'>שליחת תלונה</button>
            </div>
            <div className='commander'>
                <h1>מפקדים בלבד</h1>
                <div className='commander-input'>
                    <input id='password' type="password" onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="password"> :סיסמה </label>
                </div>
                <button onClick={moveToAdmin} id='log-admin'>כניסה לאדמין</button>
            </div>
        </div>
    </div>
  )
}
