export class ApiUrl {

    public static getDevicesGPS() {
        return `${window.__RUNTIME_CONFIG__.REACT_APP_DEVICES_GPS}/devices/geolocation`;
    }

}