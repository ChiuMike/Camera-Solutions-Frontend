import { useEffect, useRef } from "react";
import * as MUI from "@mui/material";
import { Global } from "@emotion/react";
import L from "leaflet";
import { grey } from "@mui/material/colors";


export const Puller = MUI.styled(MUI.Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

export const PullerBox = MUI.styled(MUI.Box)(({ theme }) => ({
    position: 'absolute',
	top: -56,
	visibility: 'visible',
	right: 0,
	left: 0,
	backgroundColor: "#fff",
	borderTopRightRadius: '20px',
	borderTopLeftRadius: '20px',
}));

export const SwipeableDrawer = MUI.styled(MUI.SwipeableDrawer, { shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'height'})<{isOpen:boolean; height: number}>(({ theme, isOpen, height }) => ({
	...(isOpen && {
        '& .MuiDrawer-paper': {
            height: `${height}px`,
        },
    }),
}));

interface MobileDrawerBaseProps {
    drawerBleeding: number;
    height: number;
    toggleSwipDrawer: () => void;
    swipeOpen: boolean;
    mobileDrawerTitle: string;
    disableSwipeToOpen: boolean;
    hideBackdrop: boolean;
    puller: boolean;
    renderChildren: () => React.ReactNode;
}

const MobileDrawer = (props: MobileDrawerBaseProps) => {

    const {drawerBleeding, height, toggleSwipDrawer, swipeOpen,mobileDrawerTitle, renderChildren, disableSwipeToOpen, hideBackdrop, puller} = props;

    const drawerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if(drawerRef && drawerRef.current !== null)
            L.DomEvent.disableScrollPropagation(drawerRef.current as HTMLDivElement)
    }, []);

    return (
        <>
        <MUI.CssBaseline />
        <Global
            styles={{
                '& .swipeable-drawer > .MuiPaper-root': {
                    height: `calc(50% - 56px)`,
                    overflow: 'visible',
                },
            }}
        />
        <SwipeableDrawer
            className="swipeable-drawer"
            anchor="bottom"
            open={swipeOpen}
            onClose={toggleSwipDrawer}
            onOpen={toggleSwipDrawer}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={disableSwipeToOpen} //false
            hideBackdrop={hideBackdrop} //true
            ModalProps={{
                keepMounted: true,
            }}
            isOpen={swipeOpen}
            ref={drawerRef}
            height={height}
        >
            <PullerBox>
                {puller ? <Puller /> : <></>}
                <MUI.Typography sx={{ p: 2, color: 'text.secondary', fontWeight: 900 }}>{mobileDrawerTitle}</MUI.Typography>
            </PullerBox>
            {renderChildren()}
        </SwipeableDrawer>
        </>
    )
};

export default MobileDrawer;