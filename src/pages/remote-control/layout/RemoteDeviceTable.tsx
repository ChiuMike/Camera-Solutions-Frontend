import MaterialTable from "@material-table/core";
import * as MUI from "@mui/material";
import { useRef } from "react";
import { IDeviceDto } from "../../../apis/device";
import { Search, SearchIconWrapper, StyledInputBase } from "../../../components/form";
import { IRowData } from "../../../components/table";
import tableIcons from "../../../components/table/MaterialTableIcons";
import { IActionsData } from "../../../components/table/Table";
import { iotDeviceControlHeadCells } from "../../../components/table/TableHeadCells";
import { useClientDataState, useClientFiltersState } from "../context/ClientStateProvider";
import { useLayoutState } from "../context/LayoutProvider";
import { DeviceTableRoot, TableWrapper } from "../style/DeviceTable.styles";
import * as MuiIcons from '@mui/icons-material';
import { Dialog } from "../../../components/popup";
import { AxiosRequestConfig } from "axios";
import ControlForm from "./ControlForm";

interface RemoteDeviceTableBaseProps {
    navDrawerOpen: boolean;
    iotDevice: IDeviceDto[];
    listIotDevices: (options?: AxiosRequestConfig | undefined) => Promise<void>;
}

const RemoteDeviceTable = ({navDrawerOpen, iotDevice, listIotDevices}: RemoteDeviceTableBaseProps) => {

    const mediaMatch = MUI.useMediaQuery('(max-width: 1600px)');
    const tableRef = useRef<any>();

    const { handlePopupOpen, popupOpen, swipeOpen, toggleSwipDrawer } = useLayoutState();
    const { dataSelected, handleDataSelected } = useClientDataState();
    const { deviceFilters, statusFilter, handleInputChange, inputFields } = useClientFiltersState();

    const handleOpenRemotePopup = (data: IRowData) => {
        handlePopupOpen();
        handleDataSelected(data);
    }

    return (
        <DeviceTableRoot open={navDrawerOpen} swipeOpen={swipeOpen}>
            <Dialog
                disableEscapeKeyDown={false}
                open={popupOpen}
                handleOpen={handlePopupOpen}
                maxWidth={"lg"}
                renderChildren={
                    () => <ControlForm data={dataSelected as IDeviceDto} listIotDevices={listIotDevices} />
                }
            />
            <MUI.Box className="header">
                <MUI.Box className="title-container">
                    <MUI.Typography>
                        REMOTE CONTROL
                    </MUI.Typography>
                </MUI.Box>
                <MUI.Box className="search-container">
                    <Search>
                        <SearchIconWrapper>
                            <MuiIcons.Search className="search-icon" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            id="search"
                            type="text"
                            name='search'
                            placeholder="Search Device"
                            inputProps={{ 'aria-label': 'search' }}
                            value={inputFields.search}
                            onChange={handleInputChange}
                        />
                    </Search>
                </MUI.Box>
            </MUI.Box>
            <MUI.Box className="table-container">
                <MUI.Box className="content">
                    <TableWrapper>
                        <MaterialTable
                            tableRef={tableRef}
                            options={{
                                selection: false,
                                pageSize: 10,
                                search: true,
                                toolbar: true,
                                showTitle: false,
                                showTextRowsSelected: false,
                                keepSortDirectionOnColumnSwitch: true,
                                maxBodyHeight: mediaMatch ? 600 : 700,
                                searchFieldStyle: {
                                    fontSize: '14px'
                                }
                            }}
                            icons={tableIcons}
                            columns={iotDeviceControlHeadCells}
                            data={
                                iotDevice
                                .filter((device) => 
                                    deviceFilters.includes(device.name.split("_")[0].toLocaleLowerCase())
                                )
                                .filter((device, index) => {
                                    return statusFilter.includes(device.status)
                                })
                                .filter((device, index) => {
                                    return device.name.toLocaleLowerCase().includes(inputFields.search.toLocaleLowerCase()) ||
                                        device.device_id.toLocaleLowerCase().includes(inputFields.search.toLocaleLowerCase()) ||
                                        device.updated_at.toLocaleLowerCase().includes(inputFields.search.toLocaleLowerCase())
                                        
                                })
                            }
                            localization={{
                                header: {
                                    actions: ""
                                },
                            }}
                            actions={[
                                {
                                    icon:  'edit',
                                    tooltip: 'edit table',
                                    onClick: (event, rowData) => {
                                        event.stopPropagation();
                                    },
                                    position: 'row',
                                }
                            ]}
                            components={{
                                Toolbar: ((actionDataProps: any) => {
                                    return (
                                        <MUI.Box className="searchbar-container">
                                            {/* <MTableToolbar {...actionDataProps} /> */}
                                        </MUI.Box>
                                    )
                                }),
                                Action: (props: IActionsData) => {

                                    const selectedData = props.data;

                                    return (
                                        <>
                                        <MUI.Box sx={{
                                            width: '120px', display: 'flex', justifyContent: 'center', 
                                            "@media (max-width: 770px)": {
                                                width: '70px'
                                            },
                                        }}>
                                            <MUI.Button 
                                                variant="contained" 
                                                size="small" 
                                                onClick={() => handleOpenRemotePopup(selectedData)}
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: '#00bcd4', 
                                                        transition: "all 0.3s linear",
                                                        transform: "translate(0px, 1px)"
                                                    }
                                                }}
                                            >
                                                Control
                                            </MUI.Button>
                                        </MUI.Box>
                                        </>
                                    )
                                },
                            }}
                            />
                    </TableWrapper>
                </MUI.Box>
            </MUI.Box>
        </DeviceTableRoot>
    )
};

export default RemoteDeviceTable;