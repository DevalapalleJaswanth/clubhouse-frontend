import React, { useContext, useState } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import uuid from 'react-uuid';
import TextField from '@mui/material/TextField';
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
      temp.creatorID = user && user.name;
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
        {/* <input
          type="text"
          value={name}
          id="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        /> */}
        <TextField
          id="outlined-textarea"
          label=""
          placeholder="Room Name"
          multiline
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          variant="filled"
          className="text-field"
        />
        <br />
        <button
          onClick={() => {
            handleSubmit();
          }}
          style={{
            width: '200px',
            padding: '3px 8px',
            borderRadius: '0.8rem',
            background: 'grey',
            color: 'white',
            border: '1px solid white',
            fontSize: '20px',
          }}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
