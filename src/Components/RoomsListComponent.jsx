import React, { useContext } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import { useNavigate } from 'react-router-dom';
export default function RoomsListComponent() {
  const navigate = useNavigate();
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
    navigate(`/room/${room.id}`);
  };
  console.log(rooms);
  return (
    <div>
      {rooms &&
        rooms.map((room, i) => (
          <div key={i}>
            <h3>{room.name}</h3>
            <div
              onClick={() => {
                onJoin(room);
              }}
            >
              Join
            </div>
          </div>
        ))}
    </div>
  );
}
