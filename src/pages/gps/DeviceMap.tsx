import { useEffect, useRef }  from "react";
import { MapContainer,TileLayer } from 'react-leaflet'
import * as L from 'leaflet';
import "./style/map.css";
import "leaflet/dist/leaflet.css";
import { Container } from "./style/DeviceMap.styles";
import MapsControls from "./control/MapsControls";
import { GetDevicesMapResponse, ApiUrl as GPSUrl } from "../../apis/geolocation";
import Marker from "./marker/Marker";
import DeviceMapProvider from "./provider/DeviceMapProvider";
import { useAxios } from "../../hooks/useAxios";
import { ApiUrl, ReadIotDevicesResponse } from "../../apis/device";
import { RequestMethod } from "../../apis/Api";

// const mapDevices: IMapDevice[] = [
//     {
//         device: "Camera_001",
//         geolocation: [
//             {
//                 lat: "25.05833537587345",
//                 lng: "121.6119958721099",
//                 update_time: "2023/5/20 11:00"
//             }
//         ]
//     },
//     {
//         device: "Camera_002",
//         geolocation: [
//             {
//                 lat: "25.078913526642317",
//                 lng: "121.57462624146225",
//                 update_time: "2023/5/20 10:30"
//             }
//         ]
//     },
//     {
//         device: "Camera_003",
//         geolocation: [
//             {
//                 lat: "25.053762381760105",
//                 lng: "121.57829343163714",
//                 update_time: "2023/5/20 10:30"
//             }
//         ]
//     }
// ]

const DeviceMap = () => {

    const MarkerMountedRef = useRef(false);
    const previousViweRef = useRef<L.LatLngExpression>();
    const previousZoomRef = useRef<number>();

    const { loading: mapLoading, data: mapDevices, makeRequest: getDevicesGPS } = useAxios<GetDevicesMapResponse>();

    const { loading, data: iotDevice, makeRequest: listIotDevices } = useAxios<ReadIotDevicesResponse>({
        onSuccess: (response) => {
            if (response !== undefined) {
                let gpsDevices: string[] = [];
                response.data.forEach((device) => {
                    gpsDevices.push(device.name)
                })

                if(gpsDevices.length > 0) {
                    getDevicesGPS({
                        url: GPSUrl.getDevicesGPS(),
                        method: RequestMethod.POST,
                        data: {
                            devices: gpsDevices,
                        }
                    })
                }
                
            }
        }
    });

    useEffect(() => {
        listIotDevices({
            url: ApiUrl.readDevices(),
            method: RequestMethod.GET,
        })
    }, []);
   
    return (
        <DeviceMapProvider>
            <Container isMap={true}>
                <MapContainer
                    className="markercluster-map"
                    zoom={15}
                    center={[25.057471865158753, 121.61191097326105]}
                    style={{height:'100%'}}
                    zoomControl={false}
                >   
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapsControls
                        mapDevices={mapDevices ? mapDevices.data : []}
                    />
                    <Marker 
                        mapDevices={mapDevices ? mapDevices.data : []} 
                        clusterColor={"cluster-red"}
                        previousViweRef={previousViweRef}
                        MarkerMountedRef={MarkerMountedRef}
                        previousZoomRef={previousZoomRef}
                    />
                </MapContainer>
            </Container>
        </DeviceMapProvider>
    )
};

export default DeviceMap;