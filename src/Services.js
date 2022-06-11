const roomURL = '';
const userURL = '';
import axios from 'axios';

export const signIn = async (data) => {
  try {
    let res = await axios.post(`${userURL}login/`, { ...data });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const signUp = async (data) => {
  try {
    let res = await axios.post(`${userURL}`, { ...data });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserById = async (id, data) => {
  try {
    let res = await axios.post(`${userURL}${id}`, { ...data });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getAllRooms = async () => {
  try {
    let res = await axios.get(`${roomURL}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const UpdateRoomById = async (id, data) => {
  try {
    let res = await axios.post(`${roomURL}${id}`, { ...data });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteRoomById = async (id) => {
  try {
    let res = await axios.get(`${roomURL}${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};
