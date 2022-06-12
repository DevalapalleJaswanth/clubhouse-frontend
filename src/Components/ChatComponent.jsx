import React, { useEffect, useState, useContext } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Picker from 'emoji-picker-react';
import { Link } from 'react-scroll';
import { getUserById } from '../Services.js';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
export default function ChatComponent() {
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const { search } = useLocation();
  let id = search.substr(1);
  const { user, setUser, rooms, setRooms } = useContext(ClubHouseContext);
  const [showEmojiPanel, setshowEmojiPanel] = useState(false);
  console.log(search, id);
  useEffect(() => {
    let temp =
      rooms &&
      id &&
      rooms.filter((ele, i) => {
        console.log(ele.id, id);
        if (ele.id == id) {
          return ele;
        }
      });
    console.log(temp, 'temp');
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
  }, [rooms, user]);

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
    setshowEmojiPanel(false);
  };

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setMessage(`${message}${emojiObject.emoji}`);
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
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          {room &&
            room.chatMessages &&
            room.chatMessages.map((ele, i) => (
              <div
                key={i}
                style={{
                  position: user && ele.fromID == user.name && 'relative',
                  left: user && ele.fromID == user.name && '60%',
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

        <div
          className="center input-area"
          id="input"
          style={{
            //position: '-webkit-sticky',
            position: 'fixed',
            bottom: '10px',
            zIndex: 1,
            background: 'rgb(224, 246, 253)',
            borderRadius: '0.5rem',
          }}
        >
          <div>
            <div
              style={{
                // position: 'fixed',
                // bottom: '10px',
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
