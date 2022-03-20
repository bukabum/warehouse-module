import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const login_api = async (username, password, success, fail) => {
    const response = await fetch(
          `https://kimmerson.pythonanywhere.com/rest/api/token/`,
          {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "username": username,
                "password": password,
              })
          }
      );
    const text = await response.text();
    if (response.status === 200) {
      //console.log("success", JSON.parse(text));
      //localStorage.setItem('access_token', response.access);
      //localStorage.setItem('refresh_token', response.refresh);
      success(JSON.parse(text));
      window.location.href = '/';
    } else {
      //console.log("failed", text);
      Object.entries(JSON.parse(text)).forEach(([key, value])=>{
        fail(`${key}: ${value}`);
      });
    }
  };

const TOKEN_KEY = 'access_token';

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}
export const base = 'https://kimmerson.pythonanywhere.com/rest/'

const baseURL = 'https://kimmerson.pythonanywhere.com/rest/'

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  
  failedQueue = [];
}

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {
    //'Authorization': "JWT " + localStorage.getItem('access_token')? "JWT " + localStorage.getItem('access_token') : null,
    //'Authorization': 'JWT ' + localStorage.getItem('access_token'),
    'Authorization': localStorage.getItem('access_token') ?  "JWT " + localStorage.getItem('access_token') : null,
    'Content-Type': 'application/json',
    'accept': 'application/json',
  }
});
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'JWT ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }
  originalRequest._retry = true;
  isRefreshing = true;
  
  const refreshToken = window.localStorage.getItem('refresh_token');
  //const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
  //const now = Math.ceil(Date.now() / 1000);        
  //if (tokenParts.exp > now) {
    return new Promise(function (resolve, reject) 
    {return axiosInstance.post('api/token/refresh/', {refresh: refreshToken })
        .then(({data}) => {
            window.localStorage.setItem('access_token', data.access);
            window.localStorage.setItem('refresh_token', data.refresh);
            
            cookies.set('refresh_token', data.refresh, { path: '/' });
            //console.log(cookies.get('refresh_token'));

            axiosInstance.defaults.headers.common['Authorization'] = 'JWT ' + data.access;
            originalRequest.headers['Authorization'] = 'JWT ' + data.access;
            processQueue(null, data.token);
            resolve(axiosInstance(originalRequest));    
            //return axiosInstance(originalRequest);
        })
        .catch((err) => {
            processQueue(err, null);
            reject(err);
        })
        .finally(() => { isRefreshing = false })
    })
  } 
  //}

return Promise.reject(error);

});

export default login_api;