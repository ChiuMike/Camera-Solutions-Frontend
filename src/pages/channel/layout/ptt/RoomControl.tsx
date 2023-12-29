import * as MUI from "@mui/material";
import { CustomSwitch } from "../../../../components/switch";
import { useClientChannelsState } from "../../context/ClientStateProvider";
import * as MuiIcons from "@mui/icons-material/";
import { RoomDeviceTab } from "../../style/PttRoom.styles";

const RoomControl = () => {

    const { handleRoomTab, roomTab, selectedChannel } = useClientChannelsState();

    return (
        <MUI.Box className="room-control">
            <MUI.Box className="device-list-tab">
                <RoomDeviceTab selected={roomTab.tab === "device"} onClick={() => handleRoomTab("device")}>
                    <MUI.Box className="tab-avatar">
                        <MuiIcons.SpeakerGroup />
                    </MUI.Box>
                    <MUI.Box className="tab-title">
                        <MUI.Typography>
                            DEVICE
                        </MUI.Typography>
                    </MUI.Box>
                </RoomDeviceTab>
            </MUI.Box>
            <MUI.Box className="ptt-list-tab">
                <RoomDeviceTab 
                    selected={roomTab.tab === "ptt"} 
                    onClick={() => selectedChannel.channelId !== "" && handleRoomTab("ptt")}
                >
                    <MUI.Box className="tab-avatar">
                        <MuiIcons.InterpreterMode />
                    </MUI.Box>
                    <MUI.Box className="tab-title">
                        <MUI.Typography>
                            PTT
                        </MUI.Typography>
                    </MUI.Box>
                </RoomDeviceTab>
            </MUI.Box>
        </MUI.Box>
    )
};

export default RoomControl;