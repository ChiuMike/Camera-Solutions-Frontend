import { useEffect, FC, useState, useRef } from "react";
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";
import L from "leaflet";
import { IHistoryDevice } from "../../../apis/geolocation";
import { HistoryInfoCard } from "../style/HistoryInfo.styles";
import * as MuiLabs from "@mui/lab";

interface HistoryInfoBaseProps {
    isOpenInfo: boolean;
    totalDistance: string;
    totalTime: string;
    history?: IHistoryDevice;
}

const HistoryInfoCollapse: FC<HistoryInfoBaseProps> = ({isOpenInfo, history, totalDistance, totalTime}) => {

    const infoCardRef = useRef(null);

    useEffect(() => {
        if(infoCardRef.current !== null)
            L.DomEvent.disableScrollPropagation(infoCardRef.current)
    }, []);

    return (
        <MUI.Collapse in={isOpenInfo}>
            <HistoryInfoCard ref={infoCardRef}>
                <MUI.CardHeader
                    title="History route"
                    subheader={
                        <MUI.Stack direction={"row"} gap={.5} sx={{mt: 1.5}}>
                            <MuiIcons.NearMe fontSize="small"/>
                            <MUI.Typography component="h1" variant="subtitle2" sx={{lineHeight: 1.618, mr: 2}}>
                               {(Number(totalDistance)/1000).toFixed(1)}km/h
                            </MUI.Typography>
                            <MuiIcons.AccessTime fontSize="small"/>
                            <MUI.Typography component="h1" variant="subtitle2" sx={{lineHeight: 1.618,}}>
                                {totalTime} hours
                            </MUI.Typography>
                        </MUI.Stack>
                    }
                />
                <MUI.CardContent >
                    <MuiLabs.Timeline
                        sx={{
                            [`& .${MuiLabs.timelineItemClasses.root}:before`]: {
                                flex: 0,
                                padding: 0,
                            },
                        }}
                    >
                        {history?.geolocation.map((item, index)=> 
                            <MuiLabs.TimelineItem key={index}>
                                <MuiLabs.TimelineSeparator>
                                    <MuiLabs.TimelineDot>
                                        <MUI.Typography>{index+1}</MUI.Typography>
                                    </MuiLabs.TimelineDot>
                                    {index < history?.geolocation.length-1 && <MuiLabs.TimelineConnector />}
                                </MuiLabs.TimelineSeparator>
                                <MuiLabs.TimelineContent>
                                    <MUI.Typography component="h1" variant="subtitle2" sx={{fontWeight: 'bold'}}>
                                        {Number(item.lat).toFixed(3)}, {Number(item.lng).toFixed(3)}
                                    </MUI.Typography>
                                    <MUI.Typography component="h1" variant="subtitle2" sx={{color: '#9e9e9e'}}>
                                        {item.update_time}
                                    </MUI.Typography>
                                </MuiLabs.TimelineContent>
                            </MuiLabs.TimelineItem>
                        )}
                    </MuiLabs.Timeline>
                </MUI.CardContent>
            </HistoryInfoCard>
        </MUI.Collapse>
    )

};

export default HistoryInfoCollapse;