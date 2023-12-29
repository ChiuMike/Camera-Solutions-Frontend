import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { StyledBadge } from "../../../gps/style/DeviceDrawer.styles";
import { useClientChannelsState, useClientPttDeviceState } from "../../context/ClientStateProvider";
import { RoomHeaderContainer } from "../../style/PttRoom.styles";
import Speaking from "../../../../components/icon/Speaking";
import { FC } from "react";

interface RoomHeaderBaseProps {
    handleRoomOpen?: () => void;
}

const RoomHeader: FC<RoomHeaderBaseProps> = ({handleRoomOpen}) => {

    const { selectedChannel, roomTab, handleLeaveChannel} = useClientChannelsState();
    const { selectedDevice, handleConfirmOpen, handleOpen } = useClientPttDeviceState();

    return (
        <MUI.Box className="title-container">
            <RoomHeaderContainer isPtt={false} isChannelSelect={selectedChannel.channel !== ""}>
                <MUI.Box className="avatar-container">
                    {
                        roomTab.tab.toLocaleLowerCase() === "ptt" ?
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                             <MUI.Avatar variant="rounded">
                                <MuiIcons.InterpreterMode />
                            </MUI.Avatar>
                        </StyledBadge>
                        :
                        <MUI.Avatar variant="rounded">
                            <MuiIcons.SpeakerGroup />
                        </MUI.Avatar>
                    }
                </MUI.Box>
                <MUI.Box className="info-container">
                    <MUI.Box>
                        {selectedChannel.channel === "" ? 
                            <MUI.Typography className="empty">
                                Channel
                            </MUI.Typography>
                            :
                            <MUI.Typography className="primary">
                                {selectedChannel.channel}
                            </MUI.Typography>
                            
                        }
                        <MUI.Typography className="secondary">
                            {
                                roomTab.tab === "device" ? "Device Channel" : "PTT Channel"
                            }
                        </MUI.Typography>
                    </MUI.Box>
                </MUI.Box>
                <MUI.Box className="control-container">
                    {
                        roomTab.tab.toLocaleLowerCase() === "ptt" ?
                        <Speaking />
                        :
                        <MUI.Box>
                            <MUI.IconButton 
                                size="small" 
                                className="add" 
                                disabled={selectedChannel.channel===""}
                                onClick={handleOpen}
                            >
                                <MuiIcons.Add />
                            </MUI.IconButton>
                            <MUI.IconButton 
                                size="small" 
                                className="delete" 
                                onClick={handleConfirmOpen} 
                                disabled={selectedDevice.length === 0}
                            >
                                <MuiIcons.Delete />
                            </MUI.IconButton>
                            {handleRoomOpen && 
                                <MUI.IconButton 
                                    size="small" 
                                    className="add" 
                                    onClick={() => {
                                        handleLeaveChannel();
                                        if(handleRoomOpen) handleRoomOpen();
                                    }} 
                                >
                                    <MuiIcons.FirstPage />
                                </MUI.IconButton>
                            }
                        </MUI.Box>
                    }
                </MUI.Box>
            </RoomHeaderContainer>
        </MUI.Box>
    )
};

export default RoomHeader;