import React, { useContext } from 'react';
import { ClubHouseContext } from '../ClubHouseContext';
import { useNavigate } from 'react-router-dom';
import RoomsMakingComponent from './RoomsMakingComponent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {rooms &&
        rooms.map((room, i) => (
          <div key={i}>
            <h3>{room.name}</h3>
            <div className="flex-between">
              <div>Created by {room.creatorID}</div>
              <div
                onClick={() => {
                  onJoin(room);
                }}
              >
                Join
              </div>
            </div>
          </div>
        ))}
      <RoomsMakingComponent />
    </div>
  );
}
