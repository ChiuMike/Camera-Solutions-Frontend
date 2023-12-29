import { createContext, ReactNode, FC, useMemo, useContext, Dispatch, SetStateAction, useState, useCallback } from 'react';
import { AxiosResponse, RequestMethod } from '../../../apis/Api';
import { ApiUrl, ListChannelDeviceResponse, ListChannelResponse, ListChannels } from '../../../apis/channel';
import { ChannelDevice } from '../../../apis/channel/type';
import { useAxios } from '../../../hooks/useAxios';
import useClick from '../../../hooks/useClick';

type IProviderProps = {children: ReactNode;}

type AsyncChannelState = {
    channelData: ListChannels[];
    handleListChannel: () => void;
    channelLoading: boolean;
    handleAddChannel: (channelName: string) => void;
    handleDeleteChannel: (deleteChannel: string[]) => void;
    deleteLoading: boolean;
    deleteCount: number;
    handleClearDeleteCount: ()=> void;
};

type AsyncChannelError = {
    addChannelError: number | Error | null;
    setAddError: Dispatch<SetStateAction<number | Error | null>>;
    setDeleteError: Dispatch<SetStateAction<number | Error | null>>;
    deleteError: number | Error | null;
}

type AsyncChannelDeviceState = {
    channelDevices: ChannelDevice[];
    handleDataChange: () => void;
    handleListChannelDevice: (channelId: string) => void;
}

type ChannelAsyncState = {
    asyncChannelState: AsyncChannelState;
    asynceChannelError: AsyncChannelError;
    asyncChannelDevice: AsyncChannelDeviceState;
};

const AsyncChannelContext = createContext<ChannelAsyncState | null>(null);

const AsyncChannelStateProvider: FC<IProviderProps> = ({children}) => {    

    const [deleteCount, setDeleteCount] = useState(0);

    const [handleChannelDialogOpen, channelDialogOpen] = useClick();

    const [handleConfirmOpen, confirmOpen, setConfirmOpen] = useClick();

    const { loading: channelLoading, data: listResponse, makeRequest: listChannels } = useAxios<ListChannelResponse>();

    const {loading: addChannelLoading, data: addResponse, makeRequest: addChannel, error: addChannelError, setError: setAddError } = useAxios<AxiosResponse>({
        onSuccess: (response) => {
            if(response) {
                if(channelDialogOpen) handleChannelDialogOpen();
                listChannels({
                    url: ApiUrl.listChannel(),
                    method: RequestMethod.GET
                });
            }
        }
    });

    const { loading: delLoading, data: delResponse, makeRequest: deleteChannel, error: deleteError, setError: setDeleteError } = useAxios<AxiosResponse>({
        onSuccess: (response) => {
            if(response) {
                handleDeleteCountChange();
            }
        }
    });
    
    const { loading, data: listDevicesResponse, makeRequest: listChannelDevice, handleDataChange } = useAxios<ListChannelDeviceResponse>();

    const channelData = useMemo(() => {
        return listResponse ? listResponse.data : [];
    } ,[channelLoading]);

    const channelDevices = useMemo(() => {
        return listDevicesResponse ? listDevicesResponse.data : []
    } ,[loading, handleDataChange])

    const handleListChannel = () => {
        listChannels({
            url: ApiUrl.listChannel(),
            method: RequestMethod.GET
        })
    }

    const handleAddChannel = (channelName: string) => {
        addChannel({
            url: ApiUrl.addChannel(),
            method: RequestMethod.POST,
            data: {
                name: channelName
            }
        })
    };

    const handleDeleteChannel = (deleteChannels: string[]) => {
        if(deleteChannels.length === 0) return;
        deleteChannels.forEach((channelUuid) => {
            deleteChannel({
                url: ApiUrl.deleteChannel(channelUuid),
                method:RequestMethod.DELETE
            })
        })
    };

    const handleListChannelDevice = (channelId: string) => {
        if(channelId === "") return;
        listChannelDevice({
            url: ApiUrl.listChannelDevice(channelId),
            method: RequestMethod.GET,
        });
    }

    const handleDeleteCountChange = useCallback(() => {
        setDeleteCount((prev) => prev +=1);
    }, [deleteCount]);

    const handleClearDeleteCount = useCallback(() => {
        setDeleteCount(0);
    }, [deleteCount]);

    const asynceChannelError = useMemo(() => {
        return {
            addChannelError, 
            setAddError,
            deleteError,
            setDeleteError,
        }
    }, [addChannelError, deleteError])

    const asyncChannelState = useMemo(() => {

        return {
            channelData, 
            handleListChannel, 
            channelLoading, 
            handleAddChannel, 
            handleDeleteChannel,
            deleteCount,
            handleClearDeleteCount
        } as AsyncChannelState;

    }, [channelLoading, channelData.length, addChannelError, setAddError, deleteError, deleteCount, handleClearDeleteCount, setDeleteError]);

    const asyncChannelDevice = useMemo(() => {
        return {
            channelDevices,
            handleDataChange,
            handleListChannelDevice
        } as AsyncChannelDeviceState
    }, [loading, channelDevices.length])

    return (
        <AsyncChannelContext.Provider
            value={{
                asyncChannelState,
                asynceChannelError,
                asyncChannelDevice
            }}
        >
            {children}
        </AsyncChannelContext.Provider>
    )
};

export default AsyncChannelStateProvider;

export const useAsyncChannelState = () => {
    
    const { asyncChannelState } = useContext(AsyncChannelContext) as ChannelAsyncState;

    return {...asyncChannelState}
};

export const useChannelError = () => {
    
    const { asynceChannelError } = useContext(AsyncChannelContext) as ChannelAsyncState;

    return {...asynceChannelError}
}

export const useAsyncChannelDevice = () => {
    
    const { asyncChannelDevice } = useContext(AsyncChannelContext) as ChannelAsyncState;

    return {...asyncChannelDevice}
}