import axios from 'axios'


// const baseURL = 'https://artactually.mooo.com:3000/';
const baseURL = 'http://localhost:4000/';

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
     'Access-Control-Allow-Origin':"*"
  }
});



   /////For Form Data Request to Backend
const FormData = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/form-data'
  }
});




/////For urlEncodedRequest Request to Backend
const urlEncodedRequest = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
    

export { instance, baseURL ,FormData,urlEncodedRequest };