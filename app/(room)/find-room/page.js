"use client";
import { useState } from 'react';

import Header from "../../header";
import Footer  from "../../footer";
import Link from 'next/link';
import "../../../styles/find-room.css"

const generateTimeOptions = () => {
    const times = [];
    for (let hour = 10; hour <= 19; hour++) {
      const time = `${hour}:00`;
      times.push(
        <option key={time} value={time}>
          {time}
        </option>
      );
    }
    return times;
  };
const findRoom = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeDropdowns, setShowTimeDropdowns] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [untilTime, setUntilTime] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };
    return (
        <div>
            <Header/>
            <div>
                {/* Bagian Reservation */}
                <section id="reservation" className="section">
                    <div className="reservation-box">
                    <div className="input-group">
                        <label>Reservation date</label>
                        <button
                        className="placeholder"
                        onClick={() => setShowCalendar(!showCalendar)}
                        >
                        {selectedDate ? selectedDate.toDateString() : "Add dates"}
                        </button>
                        {showCalendar && (
                        <div className="calendar-container">
                            <Calendar onChange={handleDateChange} value={selectedDate} />
                        </div>
                        )}
                    </div>
                    <div className="input-group">
                        <label>Reservation time</label>
                        <button
                        className="placeholder"
                        onClick={() => setShowTimeDropdowns(!showTimeDropdowns)}
                        >
                        Add times
                        </button>
                        {showTimeDropdowns && (
                        <div className="time-dropdown-container">
                            <div className="time-input">
                            <label>From</label>
                            <select
                                className="time-dropdown"
                                value={fromTime}
                                onChange={(e) => setFromTime(e.target.value)}
                            >
                                <option value="">Select</option>
                                {generateTimeOptions()}
                            </select>
                            </div>
                            <div className="time-input">
                            <label>Until</label>
                            <select
                                className="time-dropdown"
                                value={untilTime}
                                onChange={(e) => setUntilTime(e.target.value)}
                            >
                                <option value="">Select</option>
                                {generateTimeOptions()}
                            </select>
                            </div>
                        </div>
                        )}
                    </div>
                    <button id="find" className="find-room-button">
                        <Link href="/find-room" className="find-room-link">
                        Find Room
                        </Link>
                    </button>
                    </div>
                </section>
            </div>
            <div className="room-container">
                <div>
                    <img src="/image/regularfind.png" alt="regular room"/>
                    <h3>REGULAR ROOM</h3>
                    <Link href="/regular-room">
                        <div className="Expand-btn">Expand</div>
                    </Link>  
                </div>
                <div>       
                    <img src="/image/vipfind.png" alt="vip room"/>
                    <h3>VIP ROOM</h3>
                    <div>
                        <Link href="/vip-room">
                            <div className="Expand-btn2">Expand</div>
                        </Link> 
                    </div>  
                </div>
                <div>
                    <img src="/image/vvipfind.png" alt="vvip room"/>
                    <h3>VVIP ROOM</h3>
                    <div>
                        <Link href="/vvip-room">
                            <div className="Expand-btn3">Expand</div>
                        </Link>  
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    );
};

export default findRoom;
