import { FC, useEffect, useState }  from "react";
import { GetDevicesMapResponse, ApiUrl as GPSUrl } from "../../apis/geolocation";
import DeviceMapProvider from "./provider/DeviceMapProvider";
import { useAxios } from "../../hooks/useAxios";
import { ApiUrl, ReadIotDevicesResponse } from "../../apis/device";
import { RequestMethod } from "../../apis/Api";
import DeviceMapDrawer from "./drawer/DeviceMapDrawer";
import * as MUI from "@mui/material";
import Map from "./map/Map";
import MobileDrawer from "../../components/drawer/MobileDrawer";
import MobileContent from "./drawer/MobileContent";

interface DeviceMapBaseProps {
    drawerOpen: boolean;
    setIsMap: React.Dispatch<React.SetStateAction<boolean>>
}

const DeviceMap: FC<DeviceMapBaseProps> = ({drawerOpen, setIsMap}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const [swipeOpen, setSwipeOpen] = useState(false);

    const { loading: mapLoading, data: mapDevices, makeRequest: getDevicesGPS } = useAxios<GetDevicesMapResponse>();

    const { loading, data: iotDevice, makeRequest: listIotDevices } = useAxios<ReadIotDevicesResponse>({
        onSuccess: (response) => {
            if (response !== undefined) {
                let gpsDevices: string[] = [];
                response.data.filter((data) => data.connection).forEach((device) => {
                    gpsDevices.push(device.name)
                })

                if (gpsDevices.length > 0) {
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

    const toggleSwipDrawer = () => {
        setSwipeOpen((prev)=> !prev);
    };

    useEffect(() => {
        listIotDevices({
            url: ApiUrl.readDevices(),
            method: RequestMethod.GET,
        })
    }, []);

    useEffect(() => {
        setIsMap(true);
        return () => setIsMap(false);
    } ,[])
   
    return (
        <DeviceMapProvider>
            {mediaMatches ? 
                <MobileDrawer
                    drawerBleeding={56}
                    height={400}
                    toggleSwipDrawer={toggleSwipDrawer}
                    swipeOpen={swipeOpen}
                    mobileDrawerTitle={"Device List"}
                    disableSwipeToOpen={false}
                    hideBackdrop={true}
                    puller={true}
                    renderChildren={
                        () => <MobileContent data={mapDevices ? mapDevices.data : []}/>
                    }
                />
                :
                <DeviceMapDrawer 
                    drawerOpen={drawerOpen} 
                    mapLoading={mapLoading}
                    mapDevices={mapDevices ? mapDevices.data : []}
                />
            }
            <Map 
                navDrawerOpen={drawerOpen} 
                mobileOpen={swipeOpen}
                mapDevices={mapDevices ? mapDevices.data : []}
                mapLoading={mapLoading}
                toggleSwipDrawer={toggleSwipDrawer}
                swipeOpen={swipeOpen}
            />
        </DeviceMapProvider >
    )
};

export default DeviceMap;