import axios from './axios';

//creamos una funcion que se comunica con el backend enviandole el usuario por parametro.
// usando un POST
export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyRequest = () => axios.get('/auth/verify');