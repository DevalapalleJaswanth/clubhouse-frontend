import React, { useContext, useState } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import { useNavigate, useParams } from 'react-router-dom';
import RoomsMakingComponent from './RoomsMakingComponent';

export default function RoomsListComponent() {
  const navigate = useNavigate();
  const [ShowForm, setShowForm] = useState(false);
  const { id } = useParams();
  const { user, rooms, setRooms } = useContext(ClubHouseContext);
  const onJoin = (room) => {
    let temp = [...rooms];
    let temp1 = temp.map((item, i) => {
      if (item.id == room.id) {
        let members = [...item.members];
        members.push(user);
        return { ...item, members: [...members] };
      }
      return item;
    });
    setRooms(temp1);
    //console.log(rooms, temp1);
    navigate(`/room/${id && id}?${room.id}`);
  };
  console.log(rooms, user);
  return (
    <div className="center room-window">
      <div>
        {rooms &&
          rooms.map((room, i) => (
            <div key={i} className="card">
              <h3>{room.name}</h3>
              <div className="flex-between">
                <div className="badge">Created by {room.creatorID}</div>
                <div
                  onClick={() => {
                    onJoin(room);
                  }}
                  className="join-button"
                >
                  Join
                </div>
              </div>
            </div>
          ))}

        <div className="center">
          <div
            style={{
              position: 'fixed',
              bottom: '10px',
              background: 'grey',
              padding: '20px 100%',
            }}
          >
            <button
              onClick={() => {
                setShowForm(!ShowForm);
              }}
              style={{
                width: '100px',
                padding: '3px 8px',
                borderRadius: '0.8rem',
                background: 'grey',
                color: 'white',
                border: '1px solid white',
              }}
            >
              Room +
            </button>
            {ShowForm === true && (
              <RoomsMakingComponent setShowForm={setShowForm} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
