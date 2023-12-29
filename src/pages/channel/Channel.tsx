import { FC } from "react";
import Layout from "./layout/Layout";

interface ChannelBaseProps {
    drawerOpen: boolean;
}

const Channel: FC<ChannelBaseProps> = ({drawerOpen}) => {

    return (
        <>
            <Layout navDrawerOpen={drawerOpen} />
        </>
    )
};

export default Channel;