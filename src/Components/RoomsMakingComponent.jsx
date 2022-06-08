import React, { useContext, useState } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import uuid from 'react-uuid';
export default function RoomsMakingComponent({ setShowForm }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState({
    id: '',
    name: '',
    creatorID: '',
    members: [],
    chatMessages: [],
  });
  const { user, rooms, setRooms } = useContext(ClubHouseContext);
  const handleSubmit = () => {
    if (name !== '') {
      let temp = { ...room };
      temp.creatorID = user.id;
      temp.name = name;
      temp.id = uuid();
      setRoom({ ...temp });
      setRooms([...rooms, { ...temp }]);
      setShowForm(false);
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            handleSubmit();
          }}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
