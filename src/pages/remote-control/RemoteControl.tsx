import { FC } from "react";
import ClientStateProvider from "./context/ClientStateProvider";
import LayoutProvider from "./context/LayoutProvider";
import Layout from "./layout/Layout";

interface RemoteControlBaseProps {
    drawerOpen: boolean;
}

const RemoteControl = ({drawerOpen: navDrawerOpen}: RemoteControlBaseProps) => {

    return (
        <LayoutProvider>
            <ClientStateProvider>
                <Layout navDrawerOpen={navDrawerOpen} />
            </ClientStateProvider>
        </LayoutProvider>
    )
};

export default RemoteControl;