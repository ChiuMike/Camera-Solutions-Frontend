import { Dispatch, SetStateAction, FC } from "react";
import ClientProvider from "./context/ClientProvider";
import Layout from "./layout/Layout";

interface MonitorBaseProps {
    drawerOpen: boolean;
    setIsMap: Dispatch<SetStateAction<boolean>>
}

const Monitor: FC<MonitorBaseProps> = ({drawerOpen, setIsMap}) => {

    return (
        <ClientProvider>
            <Layout drawerOpen={drawerOpen} setIsMap={setIsMap}/>
        </ClientProvider>
    )
};

export default Monitor;