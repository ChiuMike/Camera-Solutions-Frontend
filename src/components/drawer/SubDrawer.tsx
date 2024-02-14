import * as MUI from "@mui/material";
import { FC, useRef } from "react";
import { DrawerHeader } from "./style/Drawer.styles";
import { SubDrawerComponent, PatrolSubDrawer as PatrolSubDrawerComponent } from "./style/SubDrawer.styles";

interface SubDrawerBaseProps {
    subDrawerWidth: number;
    subDrawerOpen: boolean;
    navDrawerOpen: boolean;
    renderChildren: () => React.ReactNode;
    mediaMatches: boolean;
    containerRef?: React.MutableRefObject<null>
    timelineOpen?: boolean;
    subDrawerWidthTimeline?: number;
    noDrawerHeader?: boolean;
    isRemote? : boolean;
};

interface PatrolDrawerBaseProps {
    subDrawerWidth: number;
    subDrawerOpen: boolean;
    navDrawerOpen: boolean;
    renderChildren: () => React.ReactNode;
    mediaMatches: boolean;
    isChecked: boolean;
}

const SubDrawer: FC<SubDrawerBaseProps> = ({subDrawerWidth, subDrawerOpen, navDrawerOpen, renderChildren, timelineOpen, subDrawerWidthTimeline, containerRef, noDrawerHeader, mediaMatches, isRemote}) => {

    return (
        <SubDrawerComponent
            variant={ mediaMatches ? "persistent" : "permanent"}
            open={ mediaMatches ? subDrawerOpen: navDrawerOpen }
            anchor="left" 
            mediaMatches={mediaMatches}
            subDrawerWidth={subDrawerWidth}
            timelineOpen={timelineOpen}
            subDrawerWidthTimeline={subDrawerWidthTimeline}
            isRemote={isRemote}
            ref={containerRef}
        >
            {noDrawerHeader !== undefined ? <></> : <DrawerHeader /> }
            {renderChildren()}
        </SubDrawerComponent>
    )
};

export const PatrolSubDrawer: FC<PatrolDrawerBaseProps> = ({subDrawerWidth, subDrawerOpen, navDrawerOpen, renderChildren, isChecked, mediaMatches}) => {

    return (
        <PatrolSubDrawerComponent
            variant={ mediaMatches ? "persistent" : "permanent"}
            open={ mediaMatches ? subDrawerOpen: navDrawerOpen }
            anchor="left" 
            mediaMatches={mediaMatches}
            subDrawerWidth={subDrawerWidth}
            isChecked={isChecked}
        >
            <DrawerHeader />
            {renderChildren()}
        </PatrolSubDrawerComponent>
    )
}

export default SubDrawer;