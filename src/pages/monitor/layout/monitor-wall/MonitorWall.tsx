import { FC } from "react";
import { Container, DropZone } from "../../style/MonitorWall.styles";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useBoardData } from "../../context/ClientProvider";
import { useDroppable } from "@dnd-kit/core";
import PanelViewItem from "../../kanban/PanelViewItem";

interface MonitorWallBaseProps {
    mobileOpen: boolean;
    navDrawerOpen: boolean;
    toggleSwipDrawer: () => void;
}

const MonitorWall: FC<MonitorWallBaseProps> = ({mobileOpen, navDrawerOpen, toggleSwipDrawer}) => {

    const { isOver, setNodeRef } = useDroppable({ id: "monitor" });

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const { boardData, handleGridView, gridValue } = useBoardData();

    return (
        <Container
            navDrawerOpen={navDrawerOpen} 
            mobileOpen={mobileOpen} 
            mediaMatches={mediaMatches}
            gridValue={gridValue}
        >
            <MUI.Box className="monitor-header">
                <MUI.Box className="monitor-tips">
                    {
                        !mediaMatches ? 
                        <MUI.Typography className="tips-text">Drag device to monitor</MUI.Typography> 
                        :
                        <MUI.Typography className="mobile-title">Monitor Wall</MUI.Typography>
                    }
                </MUI.Box>
                <MUI.ToggleButtonGroup
                    value={gridValue}
                    exclusive
                    onChange={handleGridView}
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
                    <MUI.ToggleButton value={4} aria-label="left aligned" className="grid-16">
                        <MuiIcons.Grid4x4 />
                    </MUI.ToggleButton>
                </MUI.ToggleButtonGroup>
            </MUI.Box>
            <MUI.Box className="monitor-wall">
                <MUI.Box 
                    className={`monitor-wall-content monitor`}
                    ref={setNodeRef}
                    sx={{backgroundColor: isOver ? "#E3FCEF" : "#FFF"}}
                >
                    <SortableContext
                        items={[...boardData["monitor"]]}
                        strategy={verticalListSortingStrategy}
                    >
                        {
                            boardData["monitor"].length <= (gridValue*gridValue) ?
                                boardData["monitor"].map((panelItem, itemIndex) => 
                                    <PanelViewItem
                                        key={itemIndex}
                                        itemIndex={itemIndex}
                                        panelItem={panelItem} 
                                    />
                                )
                                :
                                <></>
                        }
                    </SortableContext>
                    {Array.from(Array((gridValue*gridValue) - boardData["monitor"].length).keys()).map((item, index) =>
                        <DropZone 
                            className="default-view" 
                            key={index}
                            isOver={isOver}
                            isFocus={false}
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