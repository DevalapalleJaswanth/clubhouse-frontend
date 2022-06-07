import React, { useEffect, useState, useContext } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
export default function ChatComponent() {
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, rooms, setRooms } = useContext(ClubHouseContext);
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
  }, [rooms]);

  const onExit = () => {
    let temp = [...rooms];
    let temp1 = temp.map((item, i) => {
      if (item.id == room.id) {
        let members = [...item.members];
        let index = members.filter((ele, j) => {
          if (ele.id == user.id) {
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
    let temp1 = temp.map((item, i) => {
      if (item.id == room.id) {
        let chatMessages = [...item.chatMessages];
        chatMessages.push({
          fromID: user.id,
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
  return (
    <div style={{ position: 'relative', width: '100%' }}>
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
      <div style={{ position: 'relative' }}>
        {room &&
          room.chatMessages &&
          room.chatMessages.map((ele, i) => (
            <div
              key={i}
              style={{
                position: ele.fromID == user.id && 'relative',
                left: ele.fromID == user.id && '68%',
              }}
              className="message"
            >
              <div className="message-head">
                {ele.fromID === user.id ? 'You' : ele.fromID}
              </div>
              <div
                className="message-body"
                style={{
                  background:
                    ele.fromID == user.id
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
      <div className="center">
        <div
          style={{
            position: 'fixed',
            bottom: '5px',
            display: 'flex',
          }}
        >
          <textarea
            rows="1"
            cols="50"
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
          />
          <button
            onClick={() => {
              message !== '' && SendMessage();
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}
