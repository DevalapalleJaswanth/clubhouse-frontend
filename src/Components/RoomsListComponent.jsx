import React, { useContext, useState, useEffect } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import { useNavigate, useParams } from 'react-router-dom';
import RoomsMakingComponent from './RoomsMakingComponent';
import { getUserById, updateRoomById, getAllRooms } from '../Services.js';
export default function RoomsListComponent() {
  const navigate = useNavigate();
  const [ShowForm, setShowForm] = useState(false);
  const { id } = useParams();
  const { user, setUser, rooms, setRooms, allRooms, setAllRooms } =
    useContext(ClubHouseContext);

  useEffect(() => {
    !user &&
      getUserById(id)
        .then((result) => {
          if (result.status == 200) {
            setUser(result.data);
          } else {
            console.log(result.code);
          }
        })
        .catch((err) => console.log(err));
  }, [user]);

  const onJoin = (room) => {
    let temprooms = [...allRooms];
    let updatedRoom = {};
    let tempRooms = temprooms.map((item, i) => {
      if (item._id == room._id) {
        let members = [...item.members];
        members.push(user);
        updatedRoom = { ...item, members: [...members] };
        return { ...item, members: [...members] };
      }
      return item;
    });

    updateRoomById(room._id, updatedRoom)
      .then((result) => {
        setAllRooms(tempRooms);
        console.log(result, 'members update');
      })
      .catch((err) => console.log(err));

    navigate(`/room/${id && id}?${room._id}`);
  };

  //console.log(rooms, user, allRooms);
  return (
    <div className="center room-window">
      <div>
        <div>
          {allRooms &&
            allRooms.map((room, i) => (
              <div key={i} className="card">
                <h3>{room.name}</h3>
                <div className="flex-between">
                  <div className="badge">Created by {room.creator}</div>
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
          <div id="input"> </div>
        </div>
        <div className="center" style={{ margin: '50px' }}>
          <div
            style={{
              position: 'fixed',
              bottom: '0px',
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
                cursor: 'pointer',
              }}
            >
              Room +
            </button>

            {ShowForm === true && (
              <RoomsMakingComponent setShowForm={setShowForm} onJoin={onJoin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
