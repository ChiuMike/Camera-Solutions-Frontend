import axiosInstance from "./Api";

const AxiosInterceptors = (store: any) => {

    const { dispatch } = store;
    
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`  // for Spring Boot back-end
        }
        return config;
      },
      (error) => {
        console.log("setupInterceptors request error")
        return Promise.reject(error);
      }
    );
    
    axiosInstance.interceptors.response.use(
      (res) => { 
        return res 
      },
      async (err) => {
        const originalConfig = err.config;
  
        return Promise.reject(err);
      }
    );
  };
  
  export default AxiosInterceptors;