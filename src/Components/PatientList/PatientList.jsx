import './PatientList.css';
import '../Dashboard/DashBoard.css'
import '../Activities/Activities.css'
import React, { useEffect,useState } from 'react';
import logo from '../Images/logonoback.png';
import NewMoppointments from './NewMoppointment';
import Newpatientlist from './Newpatientlist';
import Lilogo from '../Images/Left_icon.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Searchbar from '../Activities/Searchbar';
import Addpatientlist from './Addpatientlist';
import axios from 'axios';

function PatientList () {
  const [patients, setPatients] = useState([]);
  const handleSearch = (searchTerm) => {
      
  };
    useEffect(() => {
        // Add class to body when component mounts
        document.body.classList.add('patientlist-background');
        
    
        // Remove class from body when component unmounts
        return () => {
          document.body.classList.remove('patientlist-background');
          
        };
      }, []);

      useEffect(() => {
        // Fetch appointments from the backend
        axios.get('http://localhost:8002/api/patients/admit')
          .then(response => setPatients(response.data))
          .catch(error => console.error('Error fetching appointments:', error));
      }, []);

  return (
    <div className='maindash'>
    <div className='logo_dash'>
      <img src={logo} alt="Logonoback" className="logo1"/>
      </div>
    <div className='plsidebar'>
    <div className='dashboardlogoname'>
    <p className='Optimize-text3'><Link to="/dashboard" className='custom_link'>Siva Health Hub</Link></p>
    </div>
    <NewMoppointments/>
    <Newpatientlist/>

    <div className='back'>
    <div className='activitiesmenu'>
    <img src={Lilogo} alt="dashboard-logo" className="aclogo1"/>
    <div className='activities_menu_container'>
      <p className='activities-text'><Link to="/dashboard" className='custom_link'>Back to menu</Link></p>
    </div>
    </div>
    </div>




    
    </div>
    <div className='Whitecontainer'>
    <div className='MA_text_rectangle'>
       <div className='MA_text'>
              Admit Patient List
        </div> 
      </div>
      <Searchbar placeholder="Search patients..."  handleSearch={handleSearch}/>
      <Addpatientlist/>
      <div className='Table_container'>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Assigned Doctor</th>
            <th>Disease</th>
            <th>Room No</th>
          </tr>
        </thead>
        <tbody>
  {patients.map(patient => (

      <tr key={patient._id}>
        <td>{patient.no}</td>
        <td>{patient.name}</td>
        <td>{patient.assignedDoctor}</td>
        <td><span className='PatientDisease'>{patient.diseases}</span></td>
        <td>{patient.roomNo}</td>
      </tr>
  
))}
</tbody>
</table>

      </div>

    </div>
     
    </div>
  )
}

export default PatientList
