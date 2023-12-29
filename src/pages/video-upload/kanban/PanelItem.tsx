import { useSortable } from "@dnd-kit/sortable";
import * as MUI from "@mui/material";
import { FC } from "react";
import { CSS } from "@dnd-kit/utilities";
import * as MuiIcons from "@mui/icons-material/";
import { PanelItemsType } from "../type/type";
import { useBoardData, useClientState } from "../context/ClientProvider";
import { useLayoutState } from "../context/LayoutProvider";
import { PanelItemContainer } from "../style/kanban/Panel.styles";

interface PanelItemBaseProps {
    cardIndex: number;
    card: PanelItemsType; 
};

const setState = (status: string) => {
 
    switch (status) {
        case "archiving":
            return (
                <MUI.Chip label={"Archive"} variant="outlined" size="small" className="archive"/>
            )
        case "wait": 
            return (
                <MUI.Chip label={"Wait"} variant="outlined" size="small" className="wait"/>
            )
        default: 
            return (
                <MUI.Chip label={"Ready"} variant="outlined" size="small" className="ready"/>
            )
    }
}

const PanelItem: FC<PanelItemBaseProps> = ({cardIndex, card}) => {

    const { deviceState } = useClientState();
    const { expand } = useLayoutState();
    const { handleWaitBoardData, handleArchiveBoardData, handleReadyBoardData } = useBoardData();

    const {
        setNodeRef,
        listeners,
        isDragging,
        transform,
        transition,
        attributes,
    } = useSortable({
        id: card.id,
        data: ({...card} as PanelItemsType),
        disabled: (deviceState.selectedDevice !== "")
    });

    return (
        <PanelItemContainer
            className="panel-item"
            key={cardIndex}
            ref={setNodeRef}
            isdragging={isDragging}
            isDraggable={deviceState.selectedDevice === ""}
            sx={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <MUI.Box className="panel-item-avatar">
                {card.content.includes("Salute") ? 
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
            </MUI.Box>
            <MUI.Box className="panel-item-content">
                <MUI.Box className="panel-item-title">
                    <MUI.Typography>
                        {card.content.split("_")[1]}
                    </MUI.Typography>
                </MUI.Box>
                <MUI.Box className="panel-item-status">
                    {setState(card.status)}
                </MUI.Box>
            </MUI.Box>
            <MUI.Box className="panel-item-control">
                <MUI.Box className="panel-item-button">
                    <MUI.IconButton 
                        aria-label="settings"
                        onClick={() => {
                            if(card.status === "archiving") {
                                handleArchiveBoardData(card)
                            } else if (card.status === "ready") {
                                handleReadyBoardData(card)
                            } else {
                                handleWaitBoardData(card);
                            }
                        }}
                        size="small"
                    >
                        {card.status === "archiving" ? 
                            <>
                            {(card.viewing) ?
                                <MuiIcons.VisibilityOff />
                                :
                                <MuiIcons.Visibility />
                            }
                            </>
                            :
                            <>
                            {card.status === "wait" ?
                                <MuiIcons.Close />
                                :
                                <MuiIcons.UploadFile />
                            }
                            </>
                        }
                    </MUI.IconButton>
                </MUI.Box>
                <MUI.Box 
                    className="panel-item-drag"
                    {...listeners}
                    {...attributes}
                >
                    {(!expand || card.status === "archiving") && <MuiIcons.DragIndicator />}
                </MUI.Box>
            </MUI.Box>
        </PanelItemContainer>
    )
};

export default PanelItem;
