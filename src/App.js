import React, { useState } from 'react';
import './style.css';
import { ClubHouseContext } from './ClubHouseContext';
import { RoomsListComponent, ChatComponent } from './Components/index';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
export default function App() {
  const [user, setUser] = useState({
    name: 'Jaswanth Reddy',
    id: 'Jaswanth',
  });
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 'Conversational AI',
      creatorID: 'Jaswanth',
      members: [],
      chatMessages: [
        {
          message: 'Hi',
          fromID: 'Chowdary',
          time: '12 May-2022 10:00 PM',
        },
        {
          message: 'Hi All',
          fromID: 'Cherry',
          time: '12 May-2022 11:00 PM',
        },
        {
          message: 'Greetings! ',
          fromID: 'Chowdary33',
          time: '13 May-2022 07:00 PM',
        },
      ],
    },
    {
      id: 2,
      name: 'Science',
      creatorID: 'Jaswanth33',
      members: [],
      chatMessages: [
        {
          message: 'Hi',
          fromID: 'Chowdary2',
          time: '12 May-2022 10:00 PM',
        },
        {
          message: 'Hi All',
          fromID: 'Cherry11',
          time: '12 May-2022 11:00 PM',
        },
        {
          message: 'Greetings! ',
          fromID: 'Chowdary334',
          time: '13 May-2022 07:00 PM',
        },
      ],
    },
    {
      id: 3,
      name: 'GeoPolitics',
      creatorID: 'Jaswanth040',
      members: [],
      chatMessages: [
        {
          message: 'Hi',
          fromID: 'Chowdary99',
          time: '12 May-2022 10:00 PM',
        },
        {
          message: 'Hi All',
          fromID: 'Cherry01',
          time: '12 May-2022 11:00 PM',
        },
        {
          message: 'Greetings! ',
          fromID: 'Chowdary334',
          time: '13 May-2022 07:00 PM',
        },
      ],
    },
  ]);
  return (
    <div>
      <ClubHouseContext.Provider value={{ rooms, setRooms, user }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RoomsListComponent />} />
            <Route path="/room/:id" element={<ChatComponent />} />
          </Routes>
        </BrowserRouter>
      </ClubHouseContext.Provider>
    </div>
  );
}
