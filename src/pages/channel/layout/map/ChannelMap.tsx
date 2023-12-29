import { FC, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import { ChannelDevice } from "../../../../apis/channel/type";
import { IMapUpdate } from "../../../../types/web";
import { useClientChannelsState } from "../../context/ClientStateProvider";
import ChannelMarker from "./ChannelMarker";
import MapControls from "./MapControls";

interface ChannelMapBaseProps {
    channelDevices: ChannelDevice[];
    handleListChannelDevice: (channelId: string) => void;
}

const ChannelMap: FC<ChannelMapBaseProps> = ({channelDevices, handleListChannelDevice}) => {

    const controlMountedRef = useRef(false);
    const previousViweRef = useRef<L.LatLngExpression>();
    const previousZoomRef = useRef<number>();
    const intervalRef = useRef<NodeJS.Timeout>();

    const { selectedChannel } = useClientChannelsState();

    const [timeCheck, setTimeCheck] = useState<IMapUpdate>({
        interval_end: '1m',
        interval_start : '15s',
        interval: 60000,
    });

    useEffect(() => {
        if(selectedChannel.channelId === "") {
            if(intervalRef.current) clearInterval(intervalRef.current); 
            return;
        }
        if(channelDevices.length === 0) {
            if(intervalRef.current) clearInterval(intervalRef.current); 
            return;
        }

        if(intervalRef.current) clearInterval(intervalRef.current); 

        intervalRef.current = setInterval(() => {
            handleListChannelDevice(selectedChannel.channelId);
        }, timeCheck.interval);

        return () => {
            if(intervalRef.current) clearInterval(intervalRef.current); 
        }
    }, [timeCheck.interval, selectedChannel.channelId, channelDevices.length]);
    
    return (
        <MapContainer
            className="markercluster-map"
            style={{height:'100%', position: 'relative'}}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapControls 
                controlMountedRef={controlMountedRef}
                setTimeCheck={setTimeCheck}
            />
            <ChannelMarker 
                channelDevices={channelDevices}
                clusterColor={"cluster-red"}
                previousViweRef={previousViweRef}
                previousZoomRef={previousZoomRef}
            />
        </MapContainer>
    )
};

export default ChannelMap;