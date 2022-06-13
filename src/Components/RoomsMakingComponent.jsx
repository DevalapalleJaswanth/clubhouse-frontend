import React, { useContext, useState, useEffect } from 'react';
import { ClubHouseContext, getAllRooms } from '../ClubHouseContext';
import uuid from 'react-uuid';
import TextField from '@mui/material/TextField';
import { Link } from 'react-scroll';
import { createRoom, getAllRooms, updateRoomById } from '../Services';
import Picker from 'emoji-picker-react';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useNavigate, useParams } from 'react-router-dom';
export default function RoomsMakingComponent({ setShowForm, onJoin }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [room, setRoom] = useState({
    id: '',
    name: '',
    creatorID: '',
    members: [],
    chatMessages: [],
  });
  const { user, setUser, allRooms, setAllRooms } = useContext(ClubHouseContext);
  const [showEmojiPanel, setshowEmojiPanel] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setName(`${name}${emojiObject.emoji}`);
  };

  const handleSubmit = async () => {
    if (name !== '') {
      let tempRoom = {
        name: name,
        creator: user && user.name,
        creatorID: user && user._id,
        members: [],
        chatMessages: [],
      };

      createRoom(tempRoom)
        .then((result) => {
          console.log(result, 'room making');
          if (result.status == 200 || result.status == 201) {
            //setAllRooms([...allRooms, result.data]);
            console.log(user);
            let members = [...result.data.members];
            members.push(user);
            let updatedRoom = { ...result.data, members: [...members] };
            updateRoomById(result.data._id, updatedRoom)
              .then((res) => {
                setAllRooms([...allRooms, { ...updatedRoom }]);
                console.log(res, 'members update');
              })
              .catch((err) => console.log(err));

            //setShowForm(false);
            navigate(`/room/${user && user._id}?${result.data._id}`);
          }
        })
        .catch((err) => console.log(err));
      setShowForm(false);
    }
  };
  return (
    <div className="center" id="input" style={{ padding: '10px' }}>
      <div>
        <div className="center">
          <InsertEmoticonIcon
            style={{
              width: '50px',
              height: '50px',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={() => {
              setshowEmojiPanel(!showEmojiPanel);
            }}
          />
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
        </div>
        <br />
        {showEmojiPanel && <Picker onEmojiClick={onEmojiClick} />}
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
