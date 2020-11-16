import axios from "../plugins/axios";

const registerUserURL = 'auth/register';
const loginURL = 'auth/login';

export const getUserService = () => axios.get('users/me');

export const registerService = (newUser) => axios.post(registerUserURL, newUser);

export const loginUserService = (user) => axios.post(loginURL, user);
