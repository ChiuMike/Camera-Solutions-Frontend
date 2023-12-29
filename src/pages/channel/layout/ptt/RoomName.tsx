import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { RoomNameContainer } from "../../style/PttRoom.styles";

const RoomName = () => {

    return (
        <RoomNameContainer className="room-name" error={false}>
            <MUI.Box className="room-title">
                <MuiIcons.SensorDoor />
                <MUI.Typography>
                    Push To Talk Channel
                </MUI.Typography>
            </MUI.Box>
        </RoomNameContainer>
    )
};

export default RoomName;