import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import axiosInstance, { Common } from "../apis/Api";
import * as ExpiredTypes from "../redux/tokenExpired/ActionTypes";
import { handleDateTime } from "../helper/HandleTime";

type callbackProps<T> = {
	onSuccess: (data?: T) => void;
};

export const useAxios = <T>(callback?: callbackProps<T>) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error | number | null>(null);
	const dispatch = useDispatch();
    
    const makeRequest = async(options?: AxiosRequestConfig) => {

        try {

            setLoading(true);
            const t = options?.method;
            const { data } = await axiosInstance.request<T>({
				...options
			});

            setData(data);

            if(data) {
				callback?.onSuccess(data);
			}

        } catch (error) {

            const expired = localStorage.getItem("expires_at");

            if (expired !== null && Number(expired) <= Date.now()) {
                dispatch({ 
                    type: ExpiredTypes.EXPIRED_TRUE,
                    payload: true
                });
                localStorage.clear();
            } else if(expired === null){
                dispatch({ 
                    type: ExpiredTypes.EXPIRED_TRUE,
                    payload: true
                });
            }

            if (axios.isAxiosError(error)) {

				const serverError = error as AxiosError;

				if (serverError && serverError.response) {
					setError(serverError.response.status);
				}

			} else {
				const generalError = error as Error;
				setError(generalError);
			}
            
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        data,
        makeRequest,
		setError,
    }
}

export const useAxiosWithTimeHandling = <T extends Common> (callback?: callbackProps<T>) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error | number | null>(null);
	const dispatch = useDispatch();
    
    const makeRequest = async(options?: AxiosRequestConfig) => {
		try {
			setLoading(true);
			const t = options?.method;
			const { data }: AxiosResponse = await axiosInstance.request<T>({
				...options
			});
			let dataWithHandler = handleDateTime(data.data)
			setData(()=> {
                return {
                    ...data,
                    data: dataWithHandler
                }
            });
			if(data) {
				callback?.onSuccess(data);
			}
		} catch (error) {
			const hasToken = localStorage.getItem("token");
			if (hasToken !== null) {
				let parseJwt = JSON.parse(atob(hasToken.split(".")[1]));
				if( ((parseJwt.exp) * 1000 - 60000) <= Date.now()) {
					dispatch({ 
						type: ExpiredTypes.EXPIRED_TRUE,
						payload: true
					});
					localStorage.clear();
				}
			} else if(hasToken === null) {
				dispatch({ 
					type: ExpiredTypes.EXPIRED_TRUE,
					payload: true
				});
			}

			if (axios.isAxiosError(error)) {
				const serverError = error as AxiosError;
				if (serverError && serverError.response) {
					setError(serverError.response.status);
				}
			} else {
				const generalError = error as Error;
				setError(generalError);
			}
		} finally {
			setLoading(false);
		}
	}
	
    return {
        loading,
        error,
        data,
        makeRequest,
		setError,
    }
}
