import { createContext, ReactNode, FC, useMemo, useContext, useState, useCallback } from 'react';
import { IRowData } from '../../../components/table';
import { eventType, useEventChange } from '../../../hooks/FormHooks';

type ClientFiltersState = {
    deviceFilters: string[];
    handleDeviceFilters: (value: string) => void;
    statusFilter: string[];
    handleStatusFilters: (value: string) => void;
    inputFields: {
        search: string;
    };
    handleInputChange: (event: eventType) => void;
    fields: {
        selectedTask: string;
    };
    handleSetFields: (task: string) => void;
    handleFieldsChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type ClientDataState = {
    dataSelected: IRowData;
    handleDataSelected: (dataSelected: IRowData) => void;
}

type RemoteClientState = {
    clientFiltersState: ClientFiltersState;
    clientDataState: ClientDataState;
};

type IProviderProps = {children: ReactNode;}

const RemoteClientContext = createContext<RemoteClientState | null>(null);

const ClientStateProvider: FC<IProviderProps> = ({children}) => {

    const [deviceFilters, setDeviceFilters] = useState<string[]>(["salute", "panther"]);
    const [statusFilter, setStatusFilter] = useState<string[]>([
        "READY", "LIVE_RECORD", "VIDEO_RECORD", "SOS", "ARCHIVING"
    ]);
    const [dataSelected, setDataSelected] = useState<IRowData>({});
    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});
    const [fields, setFields] = useState<{selectedTask: string}>({selectedTask: ""});

    const handleFieldsChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFields({selectedTask: event.target.value});
    }, [fields.selectedTask]);

    const handleSetFields = useCallback((task: string) => {
        setFields({selectedTask: task});
    }, [fields.selectedTask]);

    const handleDeviceFilters = useCallback((value: string) => {

        if(value === "all") {
            if(deviceFilters.length === 2) {
                setDeviceFilters([])
            } else {
                setDeviceFilters(["salute", "panther"])
            }
        } else {
            if(!deviceFilters.includes(value)) {
                setDeviceFilters([...deviceFilters, value])
            } else {
                setDeviceFilters((prev: string[]) => {
                    return prev.filter((item: string) => item !== value);
                });
            }
        }
    }, [deviceFilters.length]);

    const handleStatusFilters = useCallback((value: string) => {
        if(value === "All") {
            if(statusFilter.length === 5) {
                setStatusFilter([])
            } else {
                setStatusFilter([
                    "READY", "LIVE_RECORD", "VIDEO_RECORD", "SOS", "ARCHIVING"
                ])
            }
        } else {
            if(!statusFilter.includes(value)) {
                setStatusFilter([...statusFilter, value])
            } else {
                setStatusFilter((prev: string[]) => {
                    return prev.filter((item: string) => item !== value);
                });
            }
        }
    }, [statusFilter.length]);

    const handleDataSelected = useCallback((data: IRowData) => {
        setDataSelected(data);
    }, [dataSelected]);

    const clientFiltersState = useMemo(() => {
        return {
            deviceFilters, 
            handleDeviceFilters, 
            statusFilter, 
            handleStatusFilters, 
            handleInputChange, 
            inputFields,
            fields,
            handleFieldsChange,
            handleSetFields
        } as ClientFiltersState;

    }, [handleDeviceFilters, handleStatusFilters, inputFields.search, handleFieldsChange, handleSetFields]);

    const clientDataState = useMemo(() => {
        return {
            dataSelected, handleDataSelected 
        } as ClientDataState
    }, [handleDataSelected])


    return (
        <RemoteClientContext.Provider
            value={{
                clientFiltersState,
                clientDataState
            }}
        >
            {children}
        </RemoteClientContext.Provider>
    )
};

export const useClientFiltersState = () => {
    
    const { clientFiltersState } = useContext(RemoteClientContext) as RemoteClientState;

    return {...clientFiltersState}
};

export const useClientDataState = () => {
    
    const { clientDataState } = useContext(RemoteClientContext) as RemoteClientState;

    return {...clientDataState}
};

export default ClientStateProvider;