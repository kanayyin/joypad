'use client'; 

import React, { useState } from 'react';
import Header_admin from '@/app/header_admin';

const ReservationList = () => {
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const [showTimePopup, setShowTimePopup] = useState(false);
  const [showRoomPopup, setShowRoomPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [reservations, setReservations] = useState([
    {
      id: "RES17860235",
      date: "19/12/2023",
      time: "11:00 - 12:00",
      room: "Regular",
      payment: "YES",
    },
  ]);

  const isTableComplete = reservations.every(
    (reservation) =>
      reservation.id &&
      reservation.date &&
      reservation.time &&
      reservation.room &&
      reservation.payment
  );

  const handleAddReservation = () => {
    const newReservation = {
      id: `RES${Math.floor(10000000 + Math.random() * 90000000)}`,
      date: "",
      time: "",
      room: "",
      payment: "",
    };
    setReservations([...reservations, newReservation]);
  };

  const handleHeaderClick = (header) => {
    if (header === 'Date') {
      setShowCalendarPopup(true);
    } else if (header === 'Time') {
      setShowTimePopup(true);
    } else if (header === 'Room') {
      setShowRoomPopup(true);
    } else if (header === 'Payment') {
      setShowSuccess(true);
    }
  };

  const handleRoomSelection = (room) => {
    setReservations((prev) => {
      const lastReservation = { ...prev[prev.length - 1], room };
      return [...prev.slice(0, -1), lastReservation];
    });
    setShowRoomPopup(false);
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header_admin />
      </div>
      <div className="flex justify-center pt-20">
        <main className="w-full max-w-7xl px-4">
          <div className="bg-purple-100 rounded-3xl p-6 shadow-sm">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-medium text-gray-700">Daftar Reservasi</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-[20px] text-white bg-purple-400">
                  Cancel
                </button>
                <button
                  onClick={handleAddReservation}
                  disabled={!isTableComplete}
                  className={`px-4 py-2 rounded-[20px] text-white ${
                    isTableComplete
                      ? "bg-purple-400"
                      : "bg-purple-200 cursor-not-allowed"
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="pb-4 text-gray-600">Reservation ID</th>
                    <th
                      onClick={() => handleHeaderClick('Date')}
                      className="pb-4 cursor-pointer text-black-600 hover:underline"
                    >
                      Date
                    </th>
                    <th
                      onClick={() => handleHeaderClick('Time')}
                      className="pb-4 cursor-pointer text-black-600 hover:underline"
                    >
                      Time
                    </th>
                    <th
                      onClick={() => handleHeaderClick('Room')}
                      className="pb-4 cursor-pointer text-black-600 hover:underline"
                    >
                      Room
                    </th>
                    <th
                      onClick={() => handleHeaderClick('Payment')}
                      className="pb-4 cursor-pointer text-black-600 hover:underline"
                    >
                      Payment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="text-gray-700">
                      <td className="py-2">{reservation.id}</td>
                      <td className="py-2">{reservation.date}</td>
                      <td className="py-2">{reservation.time}</td>
                      <td className="py-2">{reservation.room}</td>
                      <td className="py-2">{reservation.payment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      {showCalendarPopup && (
        <CalendarPopup
          onSelectDate={(date) => console.log(date)}
          onClose={() => setShowCalendarPopup(false)}
        />
      )}
      {showTimePopup && (
        <TimePopup
          onSelectTime={(from, until) => console.log(from, until)}
          onClose={() => setShowTimePopup(false)}
        />
      )}
      {showRoomPopup && (
        <RoomPopup
          onSelectRoom={handleRoomSelection}
          onClose={() => setShowRoomPopup(false)}
        />
      )}
      {showSuccess && (
        <PaymentSuccessModal onClose={() => setShowSuccess(false)} />
      )}
    </div>
  );
};

const RoomPopup = ({ onSelectRoom, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-[400px] max-w-[90%]">
      <h2 className="text-xl font-semibold mb-4">Select Room</h2>
      <div className="flex flex-col gap-2">
        <button
          onClick={() => onSelectRoom("Regular")}
          className="px-4 py-2 rounded-[20px] bg-purple-400 text-white"
        >
          Regular Room
        </button>
        <button
          onClick={() => onSelectRoom("VIP")}
          className="px-4 py-2 rounded-[20px] bg-purple-400 text-white"
        >
          VIP Room
        </button>
        <button
          onClick={() => onSelectRoom("VVIP")}
          className="px-4 py-2 rounded-[20px] bg-purple-400 text-white"
        >
          VVIP Room
        </button>
      </div>
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded-[20px] text-white bg-purple-400">
          Close
        </button>
      </div>
    </div>
  </div>
);

const CalendarPopup = ({ onSelectDate, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-[400px] max-w-[90%]">
      <h2 className="text-xl font-semibold mb-4">Select Date</h2>
      <input
        type="date"
        onChange={(e) => onSelectDate(e.target.value)}
        className="w-full p-2 border rounded-[10px]"
      />
      <div className="flex justify-end mt-4">
        <button onClick={onClose} className="px-4 py-2 rounded-[20px] text-white bg-purple-400">
          Close
        </button>
      </div>
    </div>
  </div>
);

const TimePopup = ({ onSelectTime, onClose }) => {
  const [fromTime, setFromTime] = useState('');
  const [untilTime, setUntilTime] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] max-w-[90%]">
        <h2 className="text-xl font-semibold mb-4">Select Time</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            className="w-full p-2 border rounded-[10px]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Until</label>
          <input
            type="time"
            value={untilTime}
            onChange={(e) => setUntilTime(e.target.value)}
            className="w-full p-2 border rounded-[10px]"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              onSelectTime(fromTime, untilTime);
              onClose();
            }}
            className="px-4 py-2 rounded-[20px] text-white bg-purple-400"
          >
            Confirm
          </button>
          <button onClick={onClose} className="px-4 py-2 rounded-[20px] text-white bg-purple-400">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-6 w-[500px] max-w-[90%]">
      <h2 className="text-xl font-semibold mb-4 text-black">Payment Successful!</h2>
      <p className="mb-4">Your reservation has been successfully created.</p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-[20px] text-white bg-purple-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default ReservationList;
