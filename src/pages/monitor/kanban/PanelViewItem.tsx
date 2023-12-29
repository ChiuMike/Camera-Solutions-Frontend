import { useSortable } from "@dnd-kit/sortable";
import * as MUI from "@mui/material";
import { FC, useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import * as MuiIcons from "@mui/icons-material/";
import { MonitorPanelItems } from "../../video-upload/type/type";
import { MonitorView } from "../style/MonitorWall.styles";

const videos = [
    "/video/driving.mp4",
    "/video/driving-on-road.mp4",
    "/video/driving.mp4",
    "/video/girl-run.mp4",
    "/video/night-car.mp4",
]

interface PanelViewItemBaseProps {
    itemIndex: number;
    panelItem: MonitorPanelItems;
};

const PanelViewItem: FC<PanelViewItemBaseProps> = ({itemIndex, panelItem}) => {

    const {
        setNodeRef,
        listeners,
        isDragging,
        transform,
        transition,
        attributes,
    } = useSortable({
        id: panelItem.id,
        data: ({...panelItem} as MonitorPanelItems),
        disabled: false
    });

    return (
        <MonitorView
            className="monitor-view"
            key={itemIndex} 
            isDraggable={true}
            isdragging={isDragging}
            ref={setNodeRef}
            sx={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <MUI.Box 
                className="device-name"
            >
                <MUI.Typography>{panelItem.content}</MUI.Typography>
            </MUI.Box>
            <MUI.Box 
                className="drag-handler"
                {...listeners}
                {...attributes}
            >
                <MuiIcons.DragIndicator />
            </MUI.Box>
            <video 
                muted={true} 
                autoPlay 
                loop
            >
                <source 
                    src ={`${videos[Math.floor(Math.random() * 5)]}`}
                    type="video/mp4"
                />
            </video>
            {/* <MUI.Box className="view-header">
                <MUI.Box 
                    className="drag-handler"
                    {...listeners}
                    {...attributes}
                >
                    <MuiIcons.DragHandle />
                </MUI.Box>
            </MUI.Box> */}
            {/* <MUI.Box className="view-contnet">
                <video muted={true} autoPlay loop>
                    <source 
                        src ={`${videos[0]}` }
                        type="video/mp4"
                    />
                </video>
            </MUI.Box> */}
            {/* <MuiIcons.OndemandVideo /> */}
        </MonitorView>
    )
};

export default PanelViewItem;