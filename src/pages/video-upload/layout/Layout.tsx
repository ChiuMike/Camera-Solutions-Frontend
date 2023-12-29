import { FC, useEffect } from "react";
import { useLayoutState } from "../context/LayoutProvider";
import { VideoUploadContainer } from "../style/Layout.styles";
import * as MUI from "@mui/material";
import VideoHeader from "./VideoHeader";
import StateKanban from "./StateKanban";
import { useAxios } from "../../../hooks/useAxios";
import { ApiUrl, ReadIotDevicesResponse } from "../../../apis/device";
import { RequestMethod } from "../../../apis/Api";
import { useBoardData } from "../context/ClientProvider";
import SelectDate from "./SelectDate";
import UploadTimeline from "./UploadTimeline";

const Layout: FC = () => {

    const { expand } = useLayoutState();
    const { setBoardData } = useBoardData();
    
    const { makeRequest: listIotDevices } = useAxios<ReadIotDevicesResponse>({
        onSuccess: (response) => {
            if(response) {
                setBoardData((prev) => {
                    response.data.forEach((device) => {

                        if(!device.connection) return;
    
                        if(device.status === "ARCHIVING") {
                            let item = {
                                content: device.name.split("_")[1],
                                id: device.device_id,
                                status: "archiving",
                                viewing: false,
                            }
    
                            const find = prev.boardPanels[1].panelItems.find((panelItem) => panelItem.content === item.content);
    
                            if(find === undefined) {
                                prev.boardPanels[1].panelItems.push(item);
                                prev.boardPanels[0].panelItems = prev.boardPanels[0].panelItems.filter((panelItem) => panelItem.content !== item.content) 
                            }
                        } else {
                            //跳過 status 正在 wait 的機器
                            let waitItem = prev.boardPanels[1].panelItems.find((panelItem) => {return panelItem.status === "wait"})
                            if(waitItem !== undefined) return;
                            
                            let item = {
                                content: device.name,
                                id: device.device_id,
                                status: "ready",
                                viewing: false,
                            }
                            const find = prev.boardPanels[0].panelItems.find((panelItem, index) => panelItem.content === item.content);
                            if(find === undefined) {
                                prev.boardPanels[0].panelItems.push(item);
                            }
                        }
                    })
    
                    return {...prev}
                });
            }
        }
    });

    useEffect(() => {
        listIotDevices({
            url: ApiUrl.readDevices(),
			method: RequestMethod.GET,
        })
    } ,[]);

    return (
        <VideoUploadContainer expand={expand}>
            <MUI.Box className="video-header">
                <VideoHeader />
            </MUI.Box>
            <MUI.Box className="kanban">
                <StateKanban />
                <MUI.Box className="device-timeline">
                    <MUI.Box className="timeline-header">
                        <SelectDate />
                    </MUI.Box>
                    <MUI.Box className="timeline-container">
                        <UploadTimeline />
                    </MUI.Box>
                </MUI.Box>
            </MUI.Box>
        </VideoUploadContainer>
    )
};

export default Layout