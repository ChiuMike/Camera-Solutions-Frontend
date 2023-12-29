import { useEffect, useState, FC, Dispatch, SetStateAction, KeyboardEvent, MouseEvent } from "react";
import * as MUI from "@mui/material";
import useClick from "../../hooks/useClick";
import { useAxios, useAxiosWithTimeHandling } from "../../hooks/useAxios";
import { GetDeviceHistoryTrackResponse, IHistoryDevice } from "../../apis/geolocation";
import { ApiUrl, ReadIotDevicesResponse } from "../../apis/device";
import { RequestMethod } from "../../apis/Api";
import TrackStateProvider from "./context/TrackStateProvider";
import HistoryDrawer from "./drawer/HistoryDrawer";
import HistoryMap from "./map/HistoryMap";
import MobileTopDrawer from "../../components/drawer/MobileTopDrawer";
import MobileDrawer from "../../components/drawer/MobileDrawer";
import MobileDrawerContent from "./drawer/MobileDrawerContent";
import "./style/historyMap.css";
import { AxiosRequestConfig } from "axios";

interface HistoryTrackBaseProps {
    drawerOpen: boolean;
    setIsMap: Dispatch<SetStateAction<boolean>>;
}

interface ParentProps {
    getHistoryTrack: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    historyDevice: IHistoryDevice | undefined;
    trackLoading: boolean;
    setHistoryData: Dispatch<SetStateAction<GetDeviceHistoryTrackResponse | undefined>>;
}

const HistoryTrack: FC<HistoryTrackBaseProps> = ({drawerOpen, setIsMap}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const [handleHistoryDrawerOpen, historyDrawerOpen, setHistoryDrawerOpen] = useClick();

    const [swipeOpen, setSwipeOpen] = useState(false);

    const [handleTopOpen, topOpen, setTopOpen] = useClick();

    const {loading: trackLoading , data: historyDevice, makeRequest: readDeviceHistoryGps, setData: setHistoryData} = useAxios<GetDeviceHistoryTrackResponse>();

    const { loading, data: iotDevice, makeRequest: listIotDevices } = useAxiosWithTimeHandling<ReadIotDevicesResponse>();

    const toggleSwipDrawer = () => {
        setSwipeOpen((prev) => !prev);
    };

    const toggleTopDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as KeyboardEvent).key === 'Tab' ||
            (event as KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
  
        setTopOpen(open);
    };

    useEffect(() => {
        setIsMap(true);
        listIotDevices({
            url: ApiUrl.readDevices(),
            method: RequestMethod.GET,
        })
        return () => {
            return setIsMap(false);
        }
    } ,[]);

    return (
        <TrackStateProvider>
            {
                mediaMatches 
                ?
                <>
                    <MobileTopDrawer
                        mobileOpen={topOpen}
                        toggleTopDrawer={toggleTopDrawer}
                    />
                    <MobileDrawer
                        drawerBleeding={56}
                        height={300}
                        toggleSwipDrawer={toggleSwipDrawer}
                        swipeOpen={swipeOpen}
                        mobileDrawerTitle={"History Track"}
                        disableSwipeToOpen={false}
                        hideBackdrop={true}
                        puller={true}
                        renderChildren={
                            () => 
                                <MobileDrawerContent
                                    data={iotDevice ? iotDevice.data: []} 
                                    getHistoryTrack={readDeviceHistoryGps}
                                    historyDevice={historyDevice?.data}
                                    trackLoading={trackLoading}
                                    setHistoryData={setHistoryData}
                                />
                        }
                    />
                </>
                :
                <HistoryDrawer
                    drawerOpen={historyDrawerOpen}
                    navDrawerOpen={drawerOpen}
                    iotDevices={iotDevice ? iotDevice.data: []}
                    getHistoryTrack={readDeviceHistoryGps}
                    historyDevice={historyDevice?.data}
                    trackLoading={trackLoading}
                    setHistoryData={setHistoryData}
                />
            }
            <HistoryMap 
                navDrawerOpen={drawerOpen}
                mobileOpen={swipeOpen}
                setMobileOpen={setSwipeOpen}
                setTopOpen={setTopOpen}
                topOpen={topOpen}
                historyDevice={historyDevice?.data}
                trackLoading={trackLoading}
            />
        </TrackStateProvider>
    )
};

export default HistoryTrack;