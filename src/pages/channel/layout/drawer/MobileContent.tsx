import { useEffect, useRef, useState, ChangeEvent }  from "react";
import { useEventChange } from "../../../../hooks/FormHooks";
import { useClientChannelsState } from "../../context/ClientStateProvider";
import * as MUI from "@mui/material";
import useClick from "../../../../hooks/useClick";
import { ChannelCard, MobileChannelRoom, MobileDrawerRoot } from "../../style/DrawerContent.styles";
import { Search, SearchIconWrapper, StyledInputBase } from "../../../../components/form";
import * as MuiIcons from "@mui/icons-material/";
import { List as ListComponent } from "../../../../components/list";
import { useAsyncChannelState } from "../../context/AsyncChannelStateProvider";
import { DeleteConfirmPopup, Dialog } from "../../../../components/popup";
import ChannelForm from "./ChannelForm";
import RoomHeader from "../ptt/RoomHeader";
import RoomControl from "../ptt/RoomControl";
import DeviceRoom from "../device/DeviceRoom";
import PttRoom from "../ptt/PttRoom";

const MobileContent = () => {

    const containerRef = useRef(null);

    const { selectedChannel, handleIntoChannel, handleLeaveChannel, roomTab } = useClientChannelsState();
    const { channelData, handleListChannel, handleDeleteChannel, deleteCount, handleClearDeleteCount } = useAsyncChannelState();
    
    const [deleteChannels, setDeleteChannel] = useState<string[]>([]);
    const [handleInputChange, inputFields] = useEventChange({ search: ''});
    const [handleRoomOpen, roomOpen] = useClick();
    const [handleConfirmOpen, confirmOpen] = useClick();
    const [handleChannelDialogOpen, channelDialogOpen] = useClick();
    
    const handleDeleteChannelChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setDeleteChannel((prev) => {
            if(prev.indexOf(event.target.value) !== -1) {
                prev = prev.filter((item) => item !== event.target.value)
                return [...prev]
            } else {
                return [...prev, event.target.value]
            }
        })
    };

    useEffect(() => {
        if(!confirmOpen) return;

        if(deleteCount === deleteChannels.length) {
            handleClearDeleteCount();
            setDeleteChannel([]);
            handleListChannel();
            handleConfirmOpen();
        };

    }, [deleteCount, confirmOpen]);

    useEffect(() => {
        if(channelDialogOpen) handleChannelDialogOpen();
    }, [channelData.length]);

    return (
        <>
        <DeleteConfirmPopup
            handleConfirmOpen={handleConfirmOpen}
            confirmOpen={confirmOpen}
            handleDelete={(deleteChannels) => handleDeleteChannel(deleteChannels)}
            dataSelected={deleteChannels}
        />
        <Dialog
            disableEscapeKeyDown={false}
            open={channelDialogOpen}
            handleOpen={handleChannelDialogOpen}
            maxWidth={"sm"}
            renderChildren={() => 
                <ChannelForm /> 
            }
        />
        <MUI.Slide direction="right" in={!roomOpen} appear={false} container={containerRef.current}>
            <MobileDrawerRoot roomOpen={roomOpen}>
                <MUI.Box className="mobile-header">
                    <Search className="search-input">
                        <SearchIconWrapper>
                            <MuiIcons.Search className="search-icon" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            id="search"
                            type="text"
                            name='search'
                            placeholder="Search Channel"
                            inputProps={{ 'aria-label': 'search' }}
                            value={inputFields.search}
                            onChange={handleInputChange}
                        />
                    </Search>
                    <MUI.Box className="button-container">
                        <MUI.IconButton
                            className="add"
                            size="small" 
                            onClick={handleChannelDialogOpen}
                            disabled={selectedChannel.channel !== ""}
                        >
                            <MuiIcons.Add />
                        </MUI.IconButton>
                        <MUI.IconButton 
                            className="delete"
                            size="small" 
                            onClick={handleConfirmOpen} 
                            disabled={deleteChannels.length ===0}
                        >
                            <MuiIcons.Delete />
                        </MUI.IconButton>
                    </MUI.Box>
                </MUI.Box>
                <MUI.Box className="mobile-content">
                    <MUI.Box className="content">
                        <ListComponent
                            data={
                                channelData
                                .filter((channel, index) => {
                                    if(inputFields.search === "") return channel;
                                    return channel.name.toLocaleLowerCase().includes(inputFields.search.toLocaleLowerCase())
                                })
                                .sort((a, b) => a.name.localeCompare(b.name))
                            }
                            renderItem={(item, index) => 
                                <ChannelCard
                                    key={index} 
                                    selected={selectedChannel.channel === item.name}
                                >
                                    <MUI.Box className="channel-avatar">
                                        <MUI.Avatar variant="rounded">
                                            <MuiIcons.SpeakerGroup />
                                        </MUI.Avatar>
                                    </MUI.Box>
                                    <MUI.Box className="channel-content">
                                        <MUI.Typography>
                                            {item.name}
                                        </MUI.Typography>
                                    </MUI.Box>
                                    <MUI.Box className="channel-control">
                                        <MUI.Tooltip title="PTT & GPS" placement="right">
                                            <MUI.IconButton 
                                                className="enter"
                                                onClick={() => {
                                                    if(selectedChannel.channel === item.name) {
                                                        handleLeaveChannel()
                                                    } else {
                                                        handleIntoChannel(item.name, item.uuid);
                                                        handleRoomOpen();
                                                    }
                                                }}
                                                sx={{color: "#02759F"}}
                                            >
                                                {selectedChannel.channel === item.name ?
                                                    <MuiIcons.NavigateBefore />
                                                        :
                                                    <MuiIcons.NavigateNext />
                                                }
                                            </MUI.IconButton>
                                        </MUI.Tooltip>
                                        <MUI.Checkbox
                                            size="small"
                                            checked={deleteChannels.indexOf(item.uuid) !== -1}
                                            value={item.uuid}
                                            name={item.uuid}
                                            onChange={handleDeleteChannelChange}
                                            disabled={selectedChannel.channel !== ""}
                                            sx={{
                                                color: "#9e9e9e",
                                                '&.Mui-checked': {
                                                    color: "#00bcd4",
                                                },
                                            }}
                                        />
                                    </MUI.Box>
                                </ChannelCard>
                            }
                        />
                    </MUI.Box>
                </MUI.Box>
            </MobileDrawerRoot>
        </MUI.Slide>
        <MUI.Slide
             direction="left" 
             in={roomOpen} 
             container={containerRef.current}
             timeout={300}
        >
            <MobileChannelRoom roomOpen={roomOpen} expand={roomTab.tab === "ptt"}>
                <RoomHeader handleRoomOpen={handleRoomOpen} />
                <RoomControl />
                {roomTab.tab.toLocaleLowerCase() === "device" ?
                    <DeviceRoom />
                    :
                    <PttRoom />
                }
            </MobileChannelRoom>
        </MUI.Slide>
        </>
    )
};

export default MobileContent;