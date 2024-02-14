import { useSortable } from "@dnd-kit/sortable";
import * as MUI from "@mui/material";
import { FC, useEffect, useRef } from "react";
import { CSS } from "@dnd-kit/utilities";
import * as MuiIcons from "@mui/icons-material/";
import { MonitorView } from "../style/MonitorWall.styles";
import { PanelItem } from "../type/board";
import { useBoardData } from "../context/ClientProvider";

interface PanelViewItemBaseProps {
    itemIndex: number;
    panelItem: PanelItem;
};

const PanelViewItem: FC<PanelViewItemBaseProps> = ({itemIndex, panelItem}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const {
        setNodeRef,
        listeners,
        isDragging,
        transform,
        transition,
        attributes,
    } = useSortable({
        id: panelItem.id,
        data: ({...panelItem} as PanelItem),
        disabled: mediaMatches,
    });

    const videoRef = useRef<HTMLVideoElement>(null);

    const { handleMobileViewClick } = useBoardData();

    useEffect(() => {
        if(videoRef.current === null) return;
        videoRef.current.src = panelItem.video

        return () => {
            if(videoRef.current !== null) videoRef.current.src = ""
        }
    }, [panelItem.content])

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
                {
                    !mediaMatches ?
                    <MuiIcons.DragIndicator />
                    :
                    <MUI.IconButton onClick={()=> handleMobileViewClick(itemIndex, panelItem.content)}>
                        <MuiIcons.Close />
                    </MUI.IconButton>   
                }
                
            </MUI.Box>
            <video 
                muted={true} 
                autoPlay 
                loop
                ref={videoRef}
            >
                <source 
                    // src ={`${panelItem.video}`}
                    type="video/mp4"
                />
            </video>
        </MonitorView>
    )
};

export default PanelViewItem;