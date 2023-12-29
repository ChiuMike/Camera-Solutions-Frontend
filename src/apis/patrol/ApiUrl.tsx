export class ApiUrl {

    public static readAllPatrols() {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_PATROL}/patrols`;
    }

    public static getPatrolGPS = (patrolId: string) => {
		return `${window.__RUNTIME_CONFIG__.REACT_APP_PATROL}/patrol/${patrolId}/gps`;
	}

}