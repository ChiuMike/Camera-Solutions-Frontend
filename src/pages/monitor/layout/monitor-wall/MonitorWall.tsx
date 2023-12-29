import { FC, useRef, useState } from "react";
import { Container, DropZone } from "../../style/MonitorWall.styles";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { MonitorBoardPanels } from "../../../video-upload/type/type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBoardData } from "../../context/ClientProvider";

interface MonitorWallBaseProps {
    mobileOpen: boolean;
    navDrawerOpen: boolean;
    toggleSwipDrawer: () => void;
    panelIndex: number;
    panel: MonitorBoardPanels;
    children: JSX.Element;
}

const MonitorWall: FC<MonitorWallBaseProps> = ({mobileOpen, navDrawerOpen, toggleSwipDrawer, panelIndex, panel, children}) => {

    const {
        isDragging,
        over,
        isOver,
        setNodeRef,
        transition,
        transform,
      } = useSortable({
        id: panel.id,
        disabled: true
    });

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');
    const containerRef = useRef<HTMLElement>(null);

    const { boardData } = useBoardData();

    const [gridValue, setGridValue] = useState<number>(2);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const handleGridValue = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: number,
    ) => {
        setGridValue((prev) => {
            if(newAlignment === null) {
                return prev;
            }
            return newAlignment
        });
    };

    const handleFocus = () => {
        setIsFocus((prev) => !prev)
    }

    return (
        <Container
            navDrawerOpen={navDrawerOpen} 
            mobileOpen={mobileOpen} 
            mediaMatches={mediaMatches}
            ref={containerRef}
            gridValue={gridValue}
            isFocus={isFocus}
        >
            <MUI.Box className="monitor-header">
                {/* <MUI.IconButton size="small" onClick={handleFocus}>
                    <MuiIcons.Handshake />
                </MUI.IconButton> */}
                <MUI.ToggleButtonGroup
                    value={gridValue}
                    exclusive
                    onChange={handleGridValue}
                    size="small"
                >
                    <MUI.ToggleButton value={1} aria-label="left aligned">
                        <MuiIcons.Tv />
                    </MUI.ToggleButton>
                    <MUI.ToggleButton value={2} aria-label="left aligned">
                        <MuiIcons.GridView/>
                    </MUI.ToggleButton>
                    <MUI.ToggleButton value={3} aria-label="left aligned">
                        <MuiIcons.GridOn />
                    </MUI.ToggleButton>
                    <MUI.ToggleButton value={4} aria-label="left aligned">
                        <MuiIcons.Grid4x4 />
                    </MUI.ToggleButton>
                </MUI.ToggleButtonGroup>
            </MUI.Box>
            <MUI.Box className="monitor-wall">
                <MUI.Box 
                    className={`monitor-wall-content ${panel.id}`}
                    key={panelIndex}
                    ref={setNodeRef}
                    sx={{
                        transform: CSS.Transform.toString(transform),
                        transition,
                    }}
                >
                    {children}
                    {Array.from(Array((gridValue*gridValue) - boardData.boardPanels[1].panelItems.length).keys()).map((item, index) =>
                         <DropZone 
                            className="default-view" 
                            key={index}
                            isOver={isOver}
                            isFocus={isFocus}
                        >
                            <MuiIcons.OndemandVideo />
                        </DropZone>
                    )}
                </MUI.Box>
            </MUI.Box>
        </Container>
    )
};

export default MonitorWall;