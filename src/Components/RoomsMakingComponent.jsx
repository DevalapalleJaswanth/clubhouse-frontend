import React, { useContext, useState, useEffect } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import uuid from 'react-uuid';
import TextField from '@mui/material/TextField';
import { Link } from 'react-scroll';
import { createRoom } from '../Services';
//import Picker from 'emoji-picker-react';
export default function RoomsMakingComponent({ setShowForm }) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState({
    id: '',
    name: '',
    creatorID: '',
    members: [],
    chatMessages: [],
  });
  const { user, setUser, rooms, setRooms } = useContext(ClubHouseContext);

  const handleSubmit = () => {
    if (name !== '') {
      let temp = { ...room };
      temp.creatorID = user && user.name;
      temp.name = name;
      temp.id = uuid();
      setRoom({ ...temp });
      setRooms([...rooms, { ...temp }]);
      setShowForm(false);
      let tempRoom = {
        name: name,
        creator: user && user.name,
        creatorID: user && user._id,
        members: [],
        chatMessages: [],
      };
      createRoom(tempRoom)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="center" id="input" style={{ padding: '10px' }}>
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
        <br />
        <Link to="input" spy={true} smooth={true}>
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
              cursor: 'pointer',
            }}
          >
            Create Room
          </button>
        </Link>
      </div>
    </div>
  );
}
