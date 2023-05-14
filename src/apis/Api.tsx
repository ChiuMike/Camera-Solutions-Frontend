import axios, { AxiosInstance } from "axios";
import { Method } from "axios";

export const REQUEST_METHOD: Method = 'get';
export const defaultBaseUrl = "http://localhost:8080/";
export const DEVELOPMENT = "development";
export const PRODUCTION = "production";
export const domain = window.location.host;
export const protocol = window.location.protocol;
export const BUILD = window.__RUNTIME_CONFIG__.REACT_APP_BUILD;

export interface Common{
    message: string;
    status: number;
}

export class RequestMethod {

    public static GET: Method  = "get";
    
    public static POST: Method = "post";
  
    public static DELETE: Method  = "delete";
  
    public static PUT: Method =  "put";
    
}

export interface AxiosResponse extends Common {
    data: {}
}

let axiosInstance: AxiosInstance;
let baseURL: string;

if (BUILD === DEVELOPMENT) {
    console.log("in development");
    baseURL = `${window.__RUNTIME_CONFIG__.REACT_APP_BASE_URL}`;
} else {
    if (`${window.__RUNTIME_CONFIG__.REACT_APP_BASE_URL}` === defaultBaseUrl) {
        console.log("in production but is same baseurl");
        baseURL = protocol + "//" + domain + "/";
    } else {
        console.log("in production but is different baseurl");
        baseURL = `${window.__RUNTIME_CONFIG__.REACT_APP_BASE_URL}`;
    }
}
  
axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        withCredentials: false,
    },
  });
  
export default axiosInstance;