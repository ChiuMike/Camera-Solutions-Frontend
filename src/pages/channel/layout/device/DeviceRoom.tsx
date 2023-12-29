import { FC, useEffect, useState } from "react";
import * as MUI from "@mui/material";
import { useClientChannelsState, useClientPttDeviceState } from "../../context/ClientStateProvider";
import { DeleteConfirmPopup, Dialog } from "../../../../components/popup";
import { List as ListComponent } from "../../../../components/list";
import { useAxios } from "../../../../hooks/useAxios";
import { AxiosResponse, RequestMethod } from "../../../../apis/Api";
import { ApiUrl } from "../../../../apis/channel";
import ChannelDeviceForm from "./ChannelDeviceForm";
import { useAsyncChannelDevice } from "../../context/AsyncChannelStateProvider";

const DeviceRoom: FC = () => {

    const { selectedChannel, roomTab} = useClientChannelsState();

    const { selectedDevice, handleSelectedDeviceChange, handleClearSelectedDevice, handleOpen, open, handleConfirmOpen, confirmOpen } = useClientPttDeviceState();

    const { channelDevices, handleListChannelDevice, handleDataChange } = useAsyncChannelDevice();

    const [deleteCount, setDeleteCount] = useState(0);

    const { loading, makeRequest: deleteChannel, error, setError } = useAxios<AxiosResponse>({
        onSuccess: () => {
            setDeleteCount((prev) => prev +1);
        }
    });

    const handleDeleteChannelDevice = () => {
        if(selectedDevice.length < 1 ) return;
        if(selectedChannel.channelId === "") return;

        selectedDevice.forEach((deviceUUID, index) => {
            deleteChannel({
                url: ApiUrl.deleteChannelDevice(selectedChannel.channelId, deviceUUID),
                method: RequestMethod.DELETE
            })
        })
    };

    useEffect(() => {
        if(selectedChannel.channelId === "") {
            handleDataChange();
            return;
        };
        if(roomTab.tab === "ptt") return;
        handleListChannelDevice(selectedChannel.channelId);
    }, [selectedChannel.channelId, roomTab.tab]);

    useEffect(() => {
        if(deleteCount !== selectedDevice.length) return;
        if(confirmOpen) {
            handleConfirmOpen();
            return;
        }
        handleListChannelDevice(selectedChannel.channelId)
        handleClearSelectedDevice();
        setDeleteCount(0);
    }, [deleteCount, confirmOpen, selectedChannel.channelId])

    return (
        <>
        <DeleteConfirmPopup
            handleConfirmOpen={handleConfirmOpen}
            confirmOpen={confirmOpen}
            handleDelete={() => handleDeleteChannelDevice()}
            dataSelected={selectedDevice}
        />
        <Dialog 
            disableEscapeKeyDown={false}
            open={open}
            handleOpen={handleOpen}
            renderChildren={() =>
                <ChannelDeviceForm 
                    handleOpen={handleOpen}
                /> 
            }
        />
        <MUI.Box className="room-name"/>
        <MUI.Box className="chat-container">
            <MUI.Box className="content">
                <ListComponent 
                    data={
                        channelDevices
                    }
                    renderItem={(item, index) =>
                        <MUI.ListItem
                            key={item.name}
                            secondaryAction={
                                <>
                                <MUI.Checkbox
                                    edge="end"
                                    value={item.uuid}
                                    name={item.uuid}
                                    onChange={handleSelectedDeviceChange}
                                    checked={selectedDevice.includes(item.uuid)}
                                />
                                </>
                            }
                            disablePadding
                        >
                            <MUI.ListItemButton>
                                <MUI.ListItemAvatar>
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
                                </MUI.ListItemAvatar>
                                <MUI.ListItemText primary={item.name} />
                            </MUI.ListItemButton>
                        </MUI.ListItem>
                    }
                />
            </MUI.Box>
        </MUI.Box>
        <MUI.Box className="foot-control-container"/>
        </>
    )
};

export default DeviceRoom;