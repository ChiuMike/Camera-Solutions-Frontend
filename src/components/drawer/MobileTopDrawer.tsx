import { useEffect, useRef, FC } from "react";
import L from "leaflet";
import * as MUI from "@mui/material";

const topDrawerHeight = 160;

export const TopDrawer = MUI.styled(MUI.Drawer, { shouldForwardProp: (prop) => prop !== 'isOpen'})<{isOpen:boolean;}>(({ theme, isOpen }) => ({
	zIndex: 9999,
	height: topDrawerHeight,
	flexShrink: 0,
	boxSizing: 'border-box',
	...(isOpen && {
		...openedSwipeableMixin(theme),
        '& .MuiDrawer-paper': openedSwipeableMixin(theme)
    }),
	...(!isOpen && {
		...closedSwipeableMixin(theme),
        '& .MuiDrawer-paper': closedSwipeableMixin(theme),
    }),
}));

const openedSwipeableMixin = (theme: MUI.Theme): MUI.CSSObject => ({
    height: topDrawerHeight,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: 'hidden',
	boxShadow: 'none'
});

const closedSwipeableMixin = (theme: MUI.Theme): MUI.CSSObject => ({
	transition: theme.transitions.create('height', {
	  easing: theme.transitions.easing.sharp,
	  duration: theme.transitions.duration.leavingScreen,
	}),
	overflowY: 'hidden',
	height: 0
});

interface MobileTopDrawerBaseProps {
    toggleTopDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
    mobileOpen: boolean;
}

const MobileTopDrawer: FC<MobileTopDrawerBaseProps> = ({toggleTopDrawer, mobileOpen}) => {

    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(drawerRef && drawerRef.current !== null)
            L.DomEvent.disableScrollPropagation(drawerRef.current as HTMLDivElement)
    }, []);

    return (
        <TopDrawer
            anchor={"top"}
            open={mobileOpen}
            onClose={toggleTopDrawer(false)}
            hideBackdrop={true}
            isOpen={mobileOpen}
            ref={drawerRef}
        >
        </TopDrawer>
    )

};

export default MobileTopDrawer;