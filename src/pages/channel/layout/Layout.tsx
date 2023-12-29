import { FC } from "react";
import ClientStateProvider from "../context/ClientStateProvider";
import ChannelDrawer from "./drawer/ChannelDrawer";
import ChannelRoom from "./ChannelRoom";
import AsyncChannelStateProvider from "../context/AsyncChannelStateProvider";

interface LayoutBaseProps {
    navDrawerOpen: boolean;
}

const Layout: FC<LayoutBaseProps> = ({navDrawerOpen}) => {
    

    return (
        <ClientStateProvider>
            <AsyncChannelStateProvider>
                <ChannelDrawer navDrawerOpen={navDrawerOpen}/>
                <ChannelRoom navDrawerOpen={navDrawerOpen} />
            </AsyncChannelStateProvider>
        </ClientStateProvider>
    )
};

export default Layout;