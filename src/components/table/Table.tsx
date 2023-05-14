import MaterialTable, { Action, Column, MTableToolbar } from "@material-table/core";
import tableIcons from "./MaterialTableIcons";
import * as MUI from "@mui/material";
import { useMemo, useRef, useState, FC, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AxiosRequestConfig, Method } from "axios";
import * as MuiIcons from "@mui/icons-material/";
import { IRowData } from "./types";
import { TableMainBox } from "./style/Table.styles";
import { StyledTitle } from "../typography";
import SkeletonTable from "./SkeletonTable";

export type ToolbarSectionBaseProps = {
    dataSelected: IRowData[];
    setDataSelected: React.Dispatch<React.SetStateAction<IRowData[]>>;
    requestMethod: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    requestOnSuccess: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    httpMethodType: Method;
    requestMethodUrlExtractor: (dataSelected: IRowData) => string;
    content: React.ElementType;
}

export type TableActionBaseProps = {
    selectedData: IRowData;
    updateTableActionMethod?: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    action: Action<IRowData>;
    data: IRowData;
    disabled: boolean;
    size: string;
    tableActionContent?: React.ElementType;
}

export type TableContainerProps = {
    toolBarComponent:React.ComponentType<ToolbarSectionBaseProps>;
    tableActionComponent?: React.ComponentType<TableActionBaseProps>;
    data: IRowData[];
    headCell: Column<IRowData>[];
    requestMethod: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    requestOnSuccess: (options?: AxiosRequestConfig | undefined) => Promise<void>;
    httpMethodType: Method;
	requestMethodUrlExtractor: (dataSelected: IRowData) => string;
    content: React.ElementType;
    isClickable: boolean;
    isController: boolean;
    currentLocation: string;
    loading: boolean;
    tableActionContent?: React.ElementType;
    maxWidth? : false | MUI.Breakpoint;
};

interface ILocationState {
    rowData: any;
    last?: string;
}

export type IActionsData = {
    action: Action<IRowData>;
    data: IRowData;
    disabled: boolean;
    size: string;
};

const Table: FC<TableContainerProps> = (props) => {

    const { 
        toolBarComponent: ToolBar,
        tableActionComponent: ActionComponent,
        data, 
        headCell, 
        isClickable, 
        isController,
        currentLocation,
        loading,
        tableActionContent
    } = props;

    const [dataSelected, setDataSelected] = useState<IRowData[]>([]);
    const tableRef = useRef<any>();
    const history = useHistory();
    const location = useLocation();
    const rowData = location.state as ILocationState;

    const isSelection: boolean = useMemo(()=> isController === false ? false : true, [isController]);

    const handleSelectionChange = (selectedData: IRowData[]) => {

        let pagedData: IRowData[] = tableRef.current.dataManager.pagedData;
        if(selectedData.length === data.length) {
            selectedData = selectedData.filter((item: IRowData, index: number) => {
                if(!pagedData.includes(item)) {
                    if(item && item.tableData) item.tableData.checked = false; 
                }
                return pagedData.includes(item);
            });
            setDataSelected(selectedData);
        } else {
            setDataSelected(selectedData);
        }
    };

    return (
        <TableMainBox loading={loading}>
            <MaterialTable 
                tableRef={tableRef}
                onSelectionChange={handleSelectionChange}
                onRowClick={(event, rowData) => {
                    if (rowData && isClickable) history.push({pathname:`${currentLocation}/${rowData.uuid}`,
                        state:{ rowData, isController }} );
                }}
                options={{
                    selection: isSelection,
                    pageSize: 5,
                    search: true,
                    toolbar: true,
                    showTitle: false,
                    showTextRowsSelected: false,
                    keepSortDirectionOnColumnSwitch: true,
                    maxBodyHeight: 400,
                    searchFieldStyle: {
                        color: '#121212',
                        fontSize: '16px'
                    }
                }}
                isLoading={loading}
                icons={tableIcons}
                columns={headCell}
                data={data}
                actions={
                    ActionComponent && [
                        {
                            icon:  'edit',
                            tooltip: 'edit table',
                            onClick: (event, rowData) => {
                                event.stopPropagation();
                            },
                            position: 'row',
                        },
                    ]
                }
                components={{
                    Toolbar: useCallback((actionDataProps: any) => {
                        return (
                            <MUI.Box className="header-toolbar">
                                <MUI.Stack 
                                    className="btn-stack"
                                    direction={'row'} 
                                    sx={{marginLeft: '16px'}}
                                    alignItems={'center'}
                                    spacing={rowData !== undefined ? 2 : 0}
                                >
                                    {rowData !== undefined && <StyledTitle sx={{fontSize: '32px', margin: '0px' }}>{rowData.rowData.name}</StyledTitle>}
                                    <ToolBar
                                        dataSelected={dataSelected}
                                        setDataSelected={setDataSelected}
                                        {...props}
                                    />
                                </MUI.Stack>
                                <MTableToolbar {...actionDataProps} />
                            </MUI.Box>
                        )
                    }, [dataSelected]),
                    OverlayLoading: (props: any) => {
                        return (
                            <>
                                <SkeletonTable tableHeadCell={headCell} />
                            </>
                            
                        )
                    }
                }}
            />
        </TableMainBox>
    )
};

export default Table;