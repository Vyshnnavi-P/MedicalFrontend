import '../Activities/Activities.css';
import '../Dashboard/DashBoard.css'
import '../OPD_Doctors/OPD_Doctor.css'
import React, { useEffect,useState } from 'react';
import logo from '../Images/logonoback.png';
import Lilogo from '../Images/Left_icon.png';
import Searchbar_OPD from '../OPD_Doctors/Searchbar_OPD';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function Physiotherapy_Doctor() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState(appointments);
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [department, setDepartment] = useState('Physiotherapy');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('activities-background');
    return () => {
      document.body.classList.remove('activities-background');
    };
  }, []);

  useEffect(() => {
    if (location.state) {
      const { selectedDoctor, selectedSlot, selectedDate } = location.state;
      setSelectedDoctor(selectedDoctor);
      setSelectedSlot(selectedSlot);
      setSelectedDate(selectedDate);
    }
  }, [location.state]);

  /*useEffect(() => {
    if (selectedDate) {
      fetchDoctors(department, selectedDate);
    }
  }, [selectedDate, department]);*/

 /* const fetchDoctors = async (dept, date) => {
    try {
      const response = await fetch(`https://medicarebackend-tk87.onrender.com/api/doctors?department=${dept}&date=${date}`);
      const data = await response.json();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAvailableSlots = async (doctorId) => {
    try {
      const response = await fetch(`https://medicarebackend-tk87.onrender.com/api/doctors/${doctorId}/slots?date=${selectedDate}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching available slots:', error);
      return [];
    }
  };*/



  const fetchDoctorsByDate = async (date) => {
    try {
      const response = await fetch('https://medicarebackend-tk87.onrender.com/api/doctors/by-date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availableDate: date, department: department }),
      });
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  /*const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };*/

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    fetchDoctorsByDate(date);
  };

  const handleBooking = () => {
    if (!selectedSlot || !selectedDoctor) return;

    navigate('/new_appointment', {
      state: {
        selectedDoctor,
        selectedSlot,
        selectedDate,
      },
    });
  };




/*

  const DoctorCard = ({ doctor, selectedDate }) => {
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const slots = doctor.availableTime.split(','); // Split the availableTime string into an array
      setAvailableSlots(slots);
    }
  }, [selectedDate, doctor]);

  return (
    <div className="doctor-card">
      <h2>{doctor.name}</h2>
      <div className="departmentname">Department: {doctor.department}</div>
      <select>
        <option value="" disabled>Select a time slot</option>
        {availableSlots.map(slot => (
          <option key={slot} value={slot}>{slot}</option>
        ))}
      </select>
    </div>
  );
};*/
const DoctorCard = ({ doctor }) => {
  const availableSlots = doctor.availableTime.split(',');

  return (
    <div className="doctor-card">
      <h2>{doctor.name}</h2>
      <select onChange={(e) => {
          setSelectedSlot(e.target.value);
          setSelectedDoctor(doctor);
        }} value={selectedSlot}>
          <option value="" disabled>Select a time slot</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>
      <div className='doctorsubmit_buttoncontainer'>
      <button onClick={handleBooking} disabled={!selectedSlot} className='doctorsubmit'>
        Select
      </button>
      </div>
    </div>
  );
};




  return (
    <div className='maindash'>
      <div className='logo_dash'>
        <img src={logo} alt="Logonoback" className="logo1" />
      </div>
      <div className='acsidebar'>
        <div className='dashboardlogoname'>
          <p className='Optimize-text3'><Link to="/dashboard" className='custom_link'>Siva Health Hub</Link></p>
        </div>
        <div className='back'>
          <div className='activitiesmenu'>
            <img src={Lilogo} alt="dashboard-logo" className="aclogo1" />
            <div className='activities_menu_container'>
              <p className='activities-text'><Link to="/dashboard" className='custom_link'>Back to menu</Link></p>
            </div>
          </div>
        </div>
      </div>
      <div className='Whitecontainer'>
        <div className='OPD_text_rectangle'>
          <div className='MA_text'>
            Welcome to Physiotherapy Department
          </div>
        </div>
        <Searchbar_OPD placeholder="Search Doctor's Name..." handleSearch={(term) => {
          const filtered = appointments.filter((item) =>
            item.appointment.toLowerCase().includes(term.toLowerCase())
          );
          setFilteredAppointments(filtered);
        }} />
        <div className='selectdata'>
          <div>
            <label htmlFor="appointment-date">Appointment Date: </label>
            <input
              type="date"
              id="appointment-date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className='doctordata'>
            {doctors.map(doctor => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
               /* selectedDate={selectedDate}*/
               
              />
            ))}
          </div>
        </div>
      <div className='availble_doctor_component'>
           Available Doctors
      </div>
      </div>
    </div>
  );
}

export default Physiotherapy_Doctor;