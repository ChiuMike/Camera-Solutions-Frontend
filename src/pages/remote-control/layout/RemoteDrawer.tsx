import * as MUI from "@mui/material";
import { SubDrawer } from "../../../components/drawer";
import { useLayoutState } from "../context/LayoutProvider";
import MobileDrawer from "../../../components/drawer/MobileDrawer";
import DrawerContent from "./DrawerContent";

interface RemoteDrawerBaseProps {
    navDrawerOpen: boolean;
}

const RemoteDrawer = ({navDrawerOpen}: RemoteDrawerBaseProps) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:576px)');
    const { subDrawerOpen, swipeOpen, toggleSwipDrawer } = useLayoutState();

    return (
        <>
        {
            mediaMatches 
            ?
            <MobileDrawer
                drawerBleeding={56}
                height={400}
                toggleSwipDrawer={toggleSwipDrawer}
                swipeOpen={swipeOpen}
                mobileDrawerTitle={"Filter"}
                disableSwipeToOpen={false}
                hideBackdrop={false}
                puller={false}
                renderChildren={
                    () => <DrawerContent />
                }
            />
            :
            <SubDrawer
                subDrawerWidth={220}
                subDrawerOpen={subDrawerOpen}
                navDrawerOpen={navDrawerOpen}
                mediaMatches={mediaMatches}
                isRemote={true}
                renderChildren={() => 
                    <DrawerContent />
                }
            />
        }
        </>
    )
};

export default RemoteDrawer;