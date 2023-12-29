import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { List as ListComponent } from "../../../../components/list";
import { PttDevice } from "./PttRoom";
import { FC } from "react";

interface RoomListBaseProps {
    pttDevice: PttDevice[];
    username: string;
}

const RoomList: FC<RoomListBaseProps> = ({pttDevice, username}) => {

    return (
        <MUI.Box className="chat-container">
            <MUI.Box className="content">
                <ListComponent 
                    data={
                        pttDevice
                        .sort((a, b) => {
                            if(a.name === username && b.name !== username){
                                return -1
                            }  else if(!a.mute && b.mute) {
                                return -1
                            }
                            return 0
                        })
                    }
                    renderItem={(item, index) => 
                        <MUI.ListItem
                            key={index}
                            secondaryAction={
                                <MUI.Box className="voice-control">
                                    <MUI.IconButton className="mute" size="small">
                                        {
                                            item.mute ?
                                            <MuiIcons.VolumeMute />
                                            :
                                            <MuiIcons.RecordVoiceOver sx={{color: "#c24242",}}/>
                                        }
                                    </MUI.IconButton>
                                </MUI.Box>
                            }
                            disablePadding
                        >
                            <MUI.ListItemButton>
                                <MUI.ListItemAvatar>
                                    {
                                        item.name === username ? 
                                        <MUI.Avatar 
                                            alt={username.toUpperCase()}
                                            src="/static/images/avatar/1.jpg"
                                            sx={{ background: "#02759F", width: 30, height: 30}}
                                        />
                                        :
                                        <>
                                        {
                                            item.name.toLocaleLowerCase().includes("salute") ?
                                            <MUI.Avatar
                                                variant="rounded" src="/images/salute-removebg.png"
                                            />
                                            :
                                            <MUI.Avatar
                                                variant="rounded" src="/images/panther_bg.png"
                                                sx={{
                                                    "img": {
                                                        transform: "scale(.8)"
                                                    }
                                                }}
                                            />
                                        }
                                        </>
                                    }  
                                </MUI.ListItemAvatar>
                                <MUI.ListItemText primary={item.name} />
                            </MUI.ListItemButton>
                        </MUI.ListItem>
                    }
                />
            </MUI.Box>
        </MUI.Box>
    )
};

export default RoomList;