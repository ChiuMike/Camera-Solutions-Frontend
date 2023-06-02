import { FC, useState, useEffect } from "react";
import HistoryDrawer from "./drawer/HistoryDrawer";
import { MapContainer,TileLayer } from 'react-leaflet';
import "../gps/style/map.css";
import "leaflet/dist/leaflet.css";
import { Container } from "./style/HistoryTrack.styles";
import { useAxios, useAxiosWithTimeHandling } from "../../hooks/useAxios";
import { ApiUrl, ReadIotDevicesResponse } from "../../apis/device";
import { RequestMethod } from "../../apis/Api";
import HistoryRoutine from "./Route/HistoryRoutine";
import { GetDeviceHistoryTrackResponse, ApiUrl as HistoryGPSApiUrl } from "../../apis/geolocation";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "../gps/style/map.css";
import HistoryInfo from "./control/HistoryInfo";
import moment from "moment";

interface HistoryTrackBaseProps {
    drawerOpen: boolean;
};

const HistoryTrack: FC<HistoryTrackBaseProps> = ({drawerOpen : navDrawerOpen}) => {

    const [ open, setOpen ] = useState(false);

    const [selectedDevice, setSelectedDevice] = useState<string>("");

    const [totalDistance, setTotalDistance] = useState<string>("");

    const [totalTime, setTotalTime] = useState<string>("");

    const {loading: historyLoading, data: historyDevice, makeRequest: readDeviceHistoryGps } = useAxios<GetDeviceHistoryTrackResponse>({
        onSuccess: (response) => {
            if(response !== undefined) {
                const start = moment(response.data.geolocation[0].update_time);
                const end = moment(response.data.geolocation[response.data.geolocation.length-1].update_time);

                setTotalTime(moment.duration(end.diff(start)).hours().toFixed(1));
            }
        }
    });

    const { loading, data: iotDevice, makeRequest: listIotDevices } = useAxiosWithTimeHandling<ReadIotDevicesResponse>({
        onSuccess: (response) => {
            if(response !== undefined) {
                setSelectedDevice(response.data[0].name);
            }
        }
    });

    useEffect(() => {
        listIotDevices({
            url: ApiUrl.readDevices(),
            method: RequestMethod.GET,
        })
    }, []);

    useEffect(() => {
        if(selectedDevice !== "") {
            readDeviceHistoryGps({
                url: HistoryGPSApiUrl.getDeviceHistoryGPS(),
                method: RequestMethod.POST,
                data: {
                    device: selectedDevice
                }
            });
        }
    }, [selectedDevice])

    return (
        <>
        <HistoryDrawer 
            open={open} 
            setOpen={setOpen} 
            navDrawerOpen={navDrawerOpen}
            setSelectedDevice={setSelectedDevice}
            selectedDevice={selectedDevice}
            iotDevice={iotDevice ? iotDevice.data : []}
            totalTime={totalTime}
        />
        <Container open={navDrawerOpen}>
            <MapContainer
                className="markercluster-map"
                zoom={15}
                style={{height:'100%'}}
                zoomControl={false}
            >   
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <HistoryInfo 
                    history={historyDevice?.data}
                    totalDistance={totalDistance}
                    totalTime={totalTime}
                />
                <HistoryRoutine 
                    device_name={selectedDevice}
                    position={historyDevice ? historyDevice.data.geolocation : []}
                    setTotalDistance={setTotalDistance}
                />
            </MapContainer>
        </Container>
        </>
    )
};

export default HistoryTrack;