import './AdminPage.css'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'
import { useState } from 'react'

export default function AdminPage() {

  // const [type, setType] = useState("")
  const [complaints, setComplaints] = useState([])
  const token = localStorage.getItem('token')

  async function getComplaints(type) {

    console.log(token);
    
    const res = await fetch(`http://localhost:3002/api/complaints/${type}`, {
      method: "get",
      headers: {

        'authorization': `Bearer ${token}`
      }
    })

    const data = await res.json()
    if (data) {

      console.log(data.response);
      
      setComplaints(data.response)
      console.log(complaints);

  }
  
}
  // No data in this category

  return (

    <div className='admin'>
        <div id='admin-title'>Admin Complaints Page</div>
        <div className='admin-page'>
          <div id='title-list'>רשימת התלונות</div>
          <div id='buttons-div'>
            <button onClick={()=>getComplaints('all')} id='all-button' className='buttons'>הכל</button>
            <button onClick={()=>getComplaints('else')} className='buttons'>אחר</button>
            <button onClick={()=>getComplaints('food')} className='buttons'>אוכל</button>
            <button onClick={()=>getComplaints('equipment')} className='buttons'>ציוד</button>
            <button onClick={()=>getComplaints('orders')} className='buttons'>פקודות</button>
          </div>
          <div className='complain-list'>
            <div id='menu'>
              <div id='type-column'>תחום</div>
              <div id='content-column'>תוכן התלונה</div>
              <div id='date-column'>תאריך יצירה</div>
            </div>

            <div id='containts-div'>
              {complaints.length !== 0 && complaints.map((complaint, index) => {
                
                return (

                  <div key={index} className='complaint-res-div'>
                    <div className='type-value'>{complaint.category}</div>
                    <div className='content-value'>{complaint.message}</div>
                    <div className='date-value'>{complaint.createdAt}</div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
    </div>
  )
}
