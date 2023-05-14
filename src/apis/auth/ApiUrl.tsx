export class ApiUrl {

    public static login() {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_SIGNIN}`;
    }

    public static logout = () => {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_SIGNOUT}`;
	}

}