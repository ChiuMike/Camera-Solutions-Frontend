export class ApiUrl {

    public static readDevices() {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_DEVICES}/devices`;
    }

    public static deleteDevices(deviceUUID: string) {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_DEVICES}/device/${deviceUUID}`;
    }

    public static addDevices() {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_DEVICES}/device`;
    }

}