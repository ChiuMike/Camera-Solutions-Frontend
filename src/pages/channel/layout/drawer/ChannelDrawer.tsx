import { FC, useEffect, useRef } from "react";
import * as MUI from "@mui/material";
import { SubDrawer } from "../../../../components/drawer";
import DrawerContent from "./DrawerContent";
import useClick from "../../../../hooks/useClick";
import { useAsyncChannelState, useChannelError } from "../../context/AsyncChannelStateProvider";
import ErrorBar from "../../../../components/helpers/ErrorBar";
import MobileDrawer from "../../../../components/drawer/MobileDrawer";
import { useClientChannelsState } from "../../context/ClientStateProvider";
import MobileContent from "./MobileContent";
import { useDebounce } from "../../../../hooks/useDebounce";

interface ChannelDrawerBaseProps {
    navDrawerOpen: boolean;
}

const ChannelDrawer: FC<ChannelDrawerBaseProps> = ({navDrawerOpen}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const desktopMatches = MUI.useMediaQuery('(max-width:992px)');
    
    const resizeRef = useRef(true);

    const [handleSubDrawerOpen, subDrawerOpen] = useClick();

    const { deleteError, setDeleteError} = useChannelError();

    const { handleListChannel } = useAsyncChannelState();

    const { toggleSwipDrawer, swipeOpen } = useClientChannelsState();

    const reload = () => {
        if (window.innerWidth < 770 && resizeRef.current) {
            resizeRef.current = false; 
            window.location.reload();
        } else if (window.innerWidth >= 770) {
            resizeRef.current = true; 
        }
    };

    const func = useDebounce(reload);

    useEffect(() => {
        handleListChannel();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', func);

        return () => {
            window.removeEventListener('resize', func);
        };
    }, [resizeRef.current]);

    return (
        <>
        <ErrorBar error={deleteError} setError={setDeleteError} />
        {mediaMatches ? 
            <MobileDrawer
                drawerBleeding={56}
                height={400}
                toggleSwipDrawer={toggleSwipDrawer}
                swipeOpen={swipeOpen}
                mobileDrawerTitle={"Channel"}
                disableSwipeToOpen={false}
                hideBackdrop={true}
                puller={true}
                renderChildren={
                    () => <MobileContent />
                }
            />
            :
            <SubDrawer
                subDrawerWidth={!desktopMatches ? 280 : 250}
                subDrawerOpen={subDrawerOpen}
                navDrawerOpen={navDrawerOpen}
                mediaMatches={mediaMatches}
                renderChildren={() => 
                    <DrawerContent />
                }
            />
        }
        </>
    )
};

export default ChannelDrawer;