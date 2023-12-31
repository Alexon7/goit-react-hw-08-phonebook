import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token =>
  (axios.defaults.headers.common.Authorization = `Bearer ${token}`);

const clearAuthHeader = () =>
  (axios.defaults.headers.common.Authorization = '');

// POST @ /users/signup
//  After successful registration, add the token to the HTTP header
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST @ /users/login
// After a successful login, add the token to the HTTP header
export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/login', credentials);
      setAuthHeader(res.data.token);
      toast.info('You are welcome');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// POST @ /users/logout
// After a successful logout, remove the token from the HTTP header
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
    toast.info('Hope you will come back later');
  } catch (error) {
    toast.error('Something went wrong! Please try again!');
    return thunkAPI.rejectWithValue(error.message);
  }
});

//  GET @ /users/current
//  * headers:
//  * Authorization: Bearer token
//  *
//  * 1. Get the token from the state via getState()
//  * 2. If there is no token, we exit without performing any operation
//  * 3. If we have a token, we add it to the HTTP header and execute the operation
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
