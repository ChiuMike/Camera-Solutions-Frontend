export const setLocalStorage = async (key: string, value: string | number | boolean) => {
    // await localStorage.setItem(key, value);
    await localStorage.setItem(key, JSON.stringify(value));
};
  