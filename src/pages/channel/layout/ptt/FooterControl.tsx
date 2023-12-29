import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { FootControlContainer } from "../../style/PttRoom.styles";
import { CustomSwitch } from "../../../../components/switch";
import { FC } from "react";

interface FooterBaseProps {
    username: string;
    isJoin: boolean;
    handleJoin: () => void;
    userMute: boolean;
    handleUserMute: () => void;
}

const FooterControl: FC<FooterBaseProps> = ({username, isJoin, handleJoin, userMute, handleUserMute}) => {

    return (
        <MUI.Box className="foot-control-container">
            <FootControlContainer>
                <MUI.Box className="user-avatar">
                    <MUI.Avatar 
                        alt={username.toUpperCase()}
                        src="/static/images/avatar/1.jpg"
                        sx={{ background: "#02759F", width: 30, height: 30}}
                    />
                </MUI.Box>
                <MUI.Box className="user-content">
                    <MUI.Typography>
                        {username.toUpperCase()}
                    </MUI.Typography>
                </MUI.Box>
                <MUI.Box className="user-control">
                    <MUI.Box>
                        <MUI.IconButton 
                            size="small"
                            onClick={handleUserMute}
                        > 
                            {userMute ? <MuiIcons.MicOff /> : <MuiIcons.Mic />}
                        </MUI.IconButton>
                    </MUI.Box>
                    <MUI.Box>
                        <MUI.IconButton size="small">
                            <MuiIcons.HeadsetMic />
                        </MUI.IconButton>
                    </MUI.Box>
                    <MUI.Box>
                        <MUI.FormControlLabel
                            control={
                                <CustomSwitch
                                    value={"join"}
                                    name={"join"}
                                    checked={isJoin}
                                    onChange={handleJoin}
                                />
                            }
                            label={"Channel Join"}
                        />
                    </MUI.Box>
                </MUI.Box>
            </FootControlContainer>
        </MUI.Box>
    )
};

export default FooterControl;