import React from 'react'
import '../Activities/Activities.css'
import '../Dashboard/DashBoard.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function Addpharmacy(){

  return (
    <div className='Addapointment_container'> 
    <div className='Addapointment_text'>
    <Link to="/add_medicine" className='custom_link'> + Add Medicine </Link>
    </div>
    </div>
  )
}

export default Addpharmacy