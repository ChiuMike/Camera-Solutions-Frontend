import { FC } from "react";
import * as MUI from "@mui/material";
import { Container } from "../style/PttRoom.styles";
import RoomHeader from "./ptt/RoomHeader";
import RoomControl from "./ptt/RoomControl";
import ChannelMap from "./map/ChannelMap";
import { useClientChannelsState } from "../context/ClientStateProvider";
import DeviceRoom from "./device/DeviceRoom";
import PttRoom from "./ptt/PttRoom";
import { useAsyncChannelDevice } from "../context/AsyncChannelStateProvider";

interface PttRoomBaseProps {
    navDrawerOpen: boolean;
}

const ChannelRoom: FC<PttRoomBaseProps> = ({navDrawerOpen}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const { roomTab, expand, swipeOpen } = useClientChannelsState();
    const { channelDevices, handleListChannelDevice } = useAsyncChannelDevice();

    return (
        <>
        <Container 
            navDrawerOpen={navDrawerOpen} 
            mediaMatches={mediaMatches} 
            mobileOpen={swipeOpen}
            expand={roomTab.tab === "ptt"}
            mapExpand={expand}
        >
            {!mediaMatches ?
                <MUI.Box className="room-container">
                    <RoomHeader />
                    <RoomControl />
                    {roomTab.tab.toLocaleLowerCase() === "device" ?
                        <DeviceRoom />
                        :
                        <PttRoom />
                    }
                </MUI.Box>
                :
                null
            }
            <MUI.Box className="map-container">
                <ChannelMap 
                    channelDevices = {channelDevices}
                    handleListChannelDevice={handleListChannelDevice}
                />
            </MUI.Box>
        </Container>
        </>
    )
};

export default ChannelRoom;