export class ApiUrl {

    public static readUsers() {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_USER}/users`;
    }

    public static addUser = () => {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_USER}/user`;
	}

    public static deleteUsers(userUUID: string) {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_USER}/user/${userUUID}`;
    }

    public static readUserDetail(userUUID: string) {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_USER}/user/${userUUID}`;
    }


}