import React, { useEffect, useState, useContext } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import { Link } from 'react-scroll';
import { getUserById, updateRoomById } from '../Services.js';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
export default function ChatComponent() {
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { search } = useLocation();
  let id = search.substr(1);
  const { user, setUser, rooms, setRooms, allRooms, setAllRooms } =
    useContext(ClubHouseContext);
  const [showEmojiPanel, setshowEmojiPanel] = useState(false);
  // console.log(search, id);
  useEffect(() => {
    let temproom =
      allRooms &&
      id &&
      allRooms.filter((ele, i) => {
        if (ele._id == id) {
          return ele;
        }
      });

    if (temproom && temproom.length > 0) setRoom(temproom[0]);

    !user &&
      getUserById(params.id)
        .then((result) => {
          if (result.status == 200) {
            setUser(result.data);
          } else {
            console.log(result.code);
          }
        })
        .catch((err) => console.log(err));
  }, [rooms, allRooms, user]);

  const onExit = () => {
    let temprooms = [...allRooms];
    let updatedRoom = {};
    let tempRooms = temprooms.map((item, i) => {
      if (item._id == room._id) {
        let members = [...item.members];
        let index =
          user &&
          members.filter((ele, j) => {
            if (ele._id == user._id) {
              return j;
            }
          });
        members.splice(index[0], 1);
        updatedRoom = { ...item, members: [...members] };
        return { ...item, members: [...members] };
      }
      return item;
    });
    updateRoomById(room._id, updatedRoom)
      .then((result) => {
        setAllRooms(tempRooms);
        console.log(result);
      })
      .catch((err) => console.log(err));

    navigate(-1);
  };

  const SendMessage = () => {
    let temprooms = [...allRooms];
    let updatedRoom = {};
    let tempRooms =
      user &&
      temprooms.map((item, i) => {
        if (item._id == room._id) {
          let chatMessages = [...item.chatMessages];
          chatMessages.push({
            fromID: user,
            message: message,
            time: moment().format('DD-MMMM-YYYY hh:mm A'),
          });
          updatedRoom = { ...item, chatMessages: [...chatMessages] };
          return { ...item, chatMessages: [...chatMessages] };
        }
        return item;
      });
    updateRoomById(room._id, updatedRoom)
      .then((result) => {
        setAllRooms(tempRooms);
      })
      .catch((err) => console.log(err));

    setMessage('');
    setshowEmojiPanel(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(`${message}${emojiObject.emoji}`);
  };

  return (
    <div>
      <div
        onClick={() => {
          onExit();
        }}
        className="banner"
      >
        <div style={{ fontSize: '20px' }}>{room && room.name}</div>
        <span
          style={{
            cursor: 'pointer',
            border: '2px solid white',
            padding: '5px 10px',
          }}
        >
          Exit
        </span>
      </div>
      <div>
        <div
          style={{ position: 'relative', marginBottom: '0px' }}
          className="chat-window"
        >
          {room &&
            room.chatMessages &&
            room.chatMessages.map((ele, i) => (
              <div
                key={i}
                style={{
                  position: user && ele.fromID._id == user._id && 'relative',
                  left: user && ele.fromID._id == user._id && '60%',
                }}
                className="message"
              >
                <div className="message-head">
                  {user && ele.fromID._id == user._id ? 'You' : ele.fromID.name}
                </div>
                <div
                  className="message-body"
                  style={{
                    background:
                      user && ele.fromID._id == user._id
                        ? 'rgb(16, 4, 128)'
                        : 'rgb(8, 115, 238)',
                  }}
                >
                  {ele.message}
                </div>
                <div className="message-foot">{ele.time}</div>
              </div>
            ))}
          <div id="input"> </div>
        </div>

        <div
          className="center input-area"
          style={{
            position: 'sticky',
            bottom: '0px',
            zIndex: 1,
            padding: '10px',
            background: 'rgb(224, 246, 253)',
            borderRadius: '0.5rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                gap: '2px',
                alignItems: 'center',
              }}
            >
              <Link
                to="input"
                spy={true}
                smooth={true}
                onClick={() => {
                  setshowEmojiPanel(!showEmojiPanel);
                }}
                style={{
                  borderRadius: '0.5rem 0 0 0.5rem',
                }}
                className="send-button center"
              >
                <InsertEmoticonIcon
                  style={{
                    width: '30px',
                    height: '32px',
                  }}
                />
              </Link>
              <TextField
                id="outlined-textarea"
                label=""
                placeholder="Type your message"
                multiline
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                variant="filled"
                className="text-field"
              />

              <Link
                to="input"
                spy={true}
                smooth={true}
                onClick={() => {
                  message !== '' && SendMessage();
                }}
                className="send-button center"
              >
                <SendIcon />
              </Link>
            </div>
            {showEmojiPanel && <Picker onEmojiClick={onEmojiClick} />}
          </div>
        </div>
      </div>
    </div>
  );
}
