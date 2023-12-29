import { useSortable } from "@dnd-kit/sortable";
import * as MUI from "@mui/material";
import { FC, useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import * as MuiIcons from "@mui/icons-material/";
import { MonitorPanelItems } from "../../video-upload/type/type";
import { MonitorDeviceCard } from "../style/MonitorDrawer.styles";

interface PanelDeviceItemBaseProps {
    itemIndex: number;
    panelItem: MonitorPanelItems;
};

const PanelDeviceItem: FC<PanelDeviceItemBaseProps> = ({itemIndex, panelItem}) => {

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
        <MonitorDeviceCard
            className={"monitor-device"}
            variant="outlined" 
            key={itemIndex} 
            isDraggable={true}
            isdragging={isDragging}
            isSalute={itemIndex % 2 === 0}
            ref={setNodeRef}
            sx={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <MUI.Box className="card-action">
                <MUI.CardHeader
                    avatar={
                        <>
                        {panelItem.content.toLocaleLowerCase().includes("salute") ? 
                            <MUI.Avatar variant="rounded" src="/images/salute-removebg.png" />
                            :
                            <MUI.Avatar 
                                variant="rounded" 
                                src="/images/panther_bg.png"
                                sx={{
                                    "img": {
                                        transform: 'scale(0.75)'
                                    }
                                }}
                            />
                        }
                        </>
                    }
                    action={
                        <MUI.Stack direction="row" alignItems={"center"} gap={1}>
                            <MUI.Divider orientation="vertical" variant="middle" flexItem />
                            {/* <MUI.Tooltip title="Drag" placement="top"> */}
                                <MUI.IconButton 
                                    aria-label="settings"
                                    {...listeners}
                                    {...attributes}
                                    sx={{color: "#02759F"}}
                                >
                                    {
                                        isDragging ? <MuiIcons.PanTool /> : <MuiIcons.Videocam />
                                    }
                                </MUI.IconButton>
                            {/* </MUI.Tooltip> */}
                        </MUI.Stack>
                    }
                    title={panelItem.content}
                />
            </MUI.Box>
        </MonitorDeviceCard>
    )
};

export default PanelDeviceItem;