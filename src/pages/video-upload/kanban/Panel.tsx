import { useSortable } from "@dnd-kit/sortable";
import * as MUI from "@mui/material";
import { FC } from "react";
import * as MuiIcons from "@mui/icons-material/";
import { CSS } from "@dnd-kit/utilities";
import { BoardPanelsType } from "../type/type";
import { useLayoutState } from "../context/LayoutProvider";
import { useClientSearch } from "../context/ClientProvider";
import { PanelContainer, PanelHeader, PannelItemWrapper } from "../style/kanban/Panel.styles";
import { Search, SearchIconWrapper, StyledInputBase } from "../../../components/form";

interface PanelBaseProps {
    panelIndex: number;
    panel: BoardPanelsType;
    children: JSX.Element;
}

const Panel: FC<PanelBaseProps> = ({panelIndex, panel, children}) => {

    const { availableSearch, archiveSearch, handleAvailableInpuChange, handleAvchiveInputInputChange } = useClientSearch();

    const {
        attributes,
        isDragging,
        listeners,
        over,
        isOver,
        setNodeRef,
        transition,
        transform,
      } = useSortable({
        id: panel.id,
        disabled: true
    });

    return (
        <PanelContainer
            className={`${panel.id}`}
            key={panelIndex}
            ref={setNodeRef}
            isDragging={isDragging}
            sx={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            <PanelHeader
                isDragging={isDragging}
                title={panel.title}
            >
                <MUI.Typography className="panel-title">
                    {panel.title}
                </MUI.Typography>
            </PanelHeader>
            <MUI.Box className="search-box">
                <MUI.Box />
                <Search className="search-input-box">
                    <SearchIconWrapper>
                        <MuiIcons.Search className="search-icon" />
                    </SearchIconWrapper>
                    {panel.title === "Available" ?
                        <StyledInputBase
                            id="search"
                            type="text"
                            name='search'
                            placeholder="Search Device"
                            inputProps={{ 'aria-label': 'search' }}
                            value={availableSearch}
                            onChange={handleAvailableInpuChange}
                        />
                        :
                        <StyledInputBase
                            id="search"
                            type="text"
                            name='search'
                            placeholder="Search Device"
                            inputProps={{ 'aria-label': 'search' }}
                            value={archiveSearch}
                            onChange={handleAvchiveInputInputChange}
                        />
                    }
                </Search>
                <MUI.Box />
            </MUI.Box>
            <MUI.Divider flexItem/>
            <PannelItemWrapper isover={isOver}>
                <MUI.Box className="content">
                    {children}   
                </MUI.Box>
            </PannelItemWrapper>  
        </PanelContainer>
    )
};

export default Panel;