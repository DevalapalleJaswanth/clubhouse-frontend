import React, { useEffect, useState, useContext } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import TextField from '@mui/material/TextField';
//import ScrollToBottom from 'react-scroll-to-bottom';
import { Link } from 'react-scroll';
import { getUserById } from '../Services.js';
export default function ChatComponent() {
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { search } = useLocation();
  let id = +search[1];
  const { user, setUser, rooms, setRooms } = useContext(ClubHouseContext);
  console.log(search);
  useEffect(() => {
    let temp =
      rooms &&
      id &&
      rooms.filter((ele, i) => {
        if (ele.id == id) {
          return ele;
        }
      });
    //console.log(temp, 'temp');
    if (temp && temp.length > 0) setRoom(temp[0]);
    //scrollToBottom();

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
  }, [rooms]);

  const onExit = () => {
    let temp = [...rooms];
    let temp1 = temp.map((item, i) => {
      if (item.id == room.id) {
        let members = [...item.members];
        let index =
          user &&
          members.filter((ele, j) => {
            if (ele._id == user._id) {
              return j;
            }
          });
        members.splice(index[0], 1);
        return { ...item, members: [...members] };
      }
      return item;
    });
    setRooms(temp1);
    //console.log(rooms, temp1);
    navigate(-1);
  };

  // console.log(room);

  const SendMessage = () => {
    let temp = [...rooms];
    let temp1 =
      user &&
      temp.map((item, i) => {
        if (item.id == room.id) {
          let chatMessages = [...item.chatMessages];
          chatMessages.push({
            fromID: user.name,
            message: message,
            time: moment().format('DD-MMMM-YYYY hh:mm A'),
          });
          return { ...item, chatMessages: [...chatMessages] };
        }
        return item;
      });
    setRooms(temp1);
    setMessage('');
  };

  //console.log(user);
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
      <div className="chat-window">
        <div style={{ position: 'relative' }}>
          {room &&
            room.chatMessages &&
            room.chatMessages.map((ele, i) => (
              <div
                key={i}
                style={{
                  position: user && ele.fromID == user.name && 'relative',
                  left: user && ele.fromID == user.name && '68%',
                }}
                className="message"
              >
                <div className="message-head">
                  {user && ele.fromID === user.name ? 'You' : ele.fromID}
                </div>
                <div
                  className="message-body"
                  style={{
                    background:
                      user && ele.fromID == user.name
                        ? 'rgb(16, 4, 128)'
                        : 'rgb(8, 115, 238)',
                  }}
                >
                  {ele.message}
                </div>
                <div className="message-foot">{ele.time}</div>
              </div>
            ))}
        </div>

        <div className="center" id="input">
          <div
            style={{
              position: 'fixed',
              bottom: '10px',
              display: 'flex',
            }}
          >
            <TextField
              id="filled-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={4}
              value={value}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              variant="filled"
            />
            {/* <textarea
              rows="2"
              cols="30"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              // onKeyPress={(event) => {
              //   const keyCode = event.keyCode;
              //   console.log(keyCode);
              //   if (message !== '' && keyCode === 13) {
              //     SendMessage();
              //   }
              // }}
              className="text-area"
            /> */}

            <Link
              to="input"
              spy={true}
              smooth={true}
              onClick={() => {
                message !== '' && SendMessage();
              }}
              className="send-button"
            >
              Send
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
