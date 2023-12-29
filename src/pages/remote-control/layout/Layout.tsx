import { FC, useEffect } from "react";
import { RequestMethod } from "../../../apis/Api";
import { ApiUrl, ReadIotDevicesResponse } from "../../../apis/device";
import { useAxiosWithTimeHandling } from "../../../hooks/useAxios";
import RemoteDeviceTable from "./RemoteDeviceTable";
import RemoteDrawer from "./RemoteDrawer";

interface LayoutBaseProps {
    navDrawerOpen: boolean;
}

const Layout: FC<LayoutBaseProps> = ({navDrawerOpen}) => {

    const { loading, data: iotDevice, makeRequest: listIotDevices } = useAxiosWithTimeHandling<ReadIotDevicesResponse>();

    useEffect(() => {
        listIotDevices({
            url: ApiUrl.readDevices(),
			method: RequestMethod.GET,
        })
    } ,[]);

    return (
        <>
        <RemoteDrawer navDrawerOpen={navDrawerOpen} />
        <RemoteDeviceTable 
            navDrawerOpen={navDrawerOpen}
            iotDevice={iotDevice ? iotDevice.data : []}
            listIotDevices={listIotDevices}
        />
        </>
    )
};

export default Layout;