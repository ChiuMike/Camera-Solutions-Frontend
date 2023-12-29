import { useState, useEffect } from "react";

export class LocalStorage {
    public static TENANT_UUID = "tenant_uuid";
    public static UUID = "uuid";
	public static USERNAME = "UserName";
}

const getStorageValue = (key: string, defaultValue: any) => {
	const initial = JSON.parse(localStorage?.getItem(key) || "{}")
	return initial || defaultValue;
};

const useLocalStorage = (key: string, defaultValue: any) => {

	const [value, setValue] = useState<string>(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return { value, setValue };
};

export default useLocalStorage;