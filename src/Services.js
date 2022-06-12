const roomURL = 'https://club-house-app.herokuapp.com/rooms/';
const userURL = 'https://club-house-app.herokuapp.com/users/';
import axios from 'axios';

export const signIn = async (data) => {
  try {
    console.log(data);
    let res = await axios.post(`${userURL}login/`, { ...data });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const signUp = async (data) => {
  try {
    let res = await axios.post(`${userURL}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};

export const getUserById = async (id) => {
  try {
    let res = await axios.get(`${userURL}${id}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateUserById = async (id, data) => {
  try {
    let res = await axios.post(`${userURL}${id}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};

export const getAllRooms = async () => {
  try {
    let res = await axios.get(`${roomURL}`);
    return res;
  } catch (err) {
    return err;
  }
};

export const createRoom = async (data) => {
  try {
    let res = await axios.post(`${roomURL}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};

export const UpdateRoomById = async (id, data) => {
  try {
    let res = await axios.post(`${roomURL}${id}`, { ...data });
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteRoomById = async (id) => {
  try {
    let res = await axios.delete(`${roomURL}${id}`);
    return res;
  } catch (err) {
    return err;
  }
};
