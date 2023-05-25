import * as React from "react";
import { AxiosResponse, RequestMethod } from "../../apis/Api";
import { ApiUrl, ReadIotDevicesResponse, IDeviceDto } from "../../apis/device";
import { DrawerHeader } from "../../components/drawer/Drawer.styles";
import ErrorBar from "../../components/helpers/ErrorBar";
import Navigation from "../../components/navigation/Navigation";
import { ControllerContainer, Table } from "../../components/table";
import { iotDeviceHeadCells } from "../../components/table/TableHeadCells";
import { useAxios, useAxiosWithTimeHandling } from "../../hooks/useAxios";
import { PageMainBox } from "../Global.styles";
import DeviceForm from "./DeviceForm";

const Device: React.FC = () => {

    const { loading, data: iotDevice, makeRequest: listIotDevices } = useAxiosWithTimeHandling<ReadIotDevicesResponse>();

    const { makeRequest: deleteDevices, error, setError } = useAxios<AxiosResponse>({
        onSuccess: (res) => {
            listIotDevices({
                url: ApiUrl.readDevices(),
                method: RequestMethod.GET,
            })
        }
    });

    React.useEffect(() => {
        listIotDevices({
            url: ApiUrl.readDevices(),
            method: RequestMethod.GET,
        })
    }, [])

    return (
        <>
        <ErrorBar error={error} setError={setError} lockedMessage={"You can't delete connected device"}/>
        <PageMainBox component="main">
            <DrawerHeader />
            <Navigation pageTitle={"DEVICES"} />
            <Table
				toolBarComponent={ControllerContainer}
				data={iotDevice? iotDevice.data: []}
				headCell={iotDeviceHeadCells}
				requestMethod={deleteDevices}
				requestOnSuccess={listIotDevices}
				httpMethodType={RequestMethod.DELETE}
				requestMethodUrlExtractor={(dataSelected) => ApiUrl.deleteDevices((dataSelected as IDeviceDto).uuid)}
				content={DeviceForm}
				isClickable={false}
				isController={true}
				currentLocation={window.location.pathname}
				loading={loading}
				maxWidth={'sm'}
			/>
        </PageMainBox>
        </>
    )
};

export default Device;