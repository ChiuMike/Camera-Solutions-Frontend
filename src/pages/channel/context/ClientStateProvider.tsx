import { createContext, ReactNode, FC, useMemo, useContext, useState, useCallback } from 'react';
import useClick from '../../../hooks/useClick';

export type IIotGroupDevice = {
    uuid: string;
    username: string | null;
    pairing_uuid: string | null;
    device_name: string;
    device_id: string;
    user_uuid: string | null;  
}

type ClientChannelsState = {
    selectedChannel: {
        channel: string;
        channelId: string;
    };
    handleIntoChannel: (channel: string, channelId: string) => void;
    handleLeaveChannel: () => void;
    roomTab: {
        tab: string;
    }
    handleRoomTab: (value: string) => void;
    expand: boolean;
    handleExpand: () => void;
    swipeOpen: boolean;
    toggleSwipDrawer: () => void;
};

type ClientChannelDeviceState = {
    pttDevice: IIotGroupDevice[];
    selectedDevice: string[];
    handleSelectedDeviceChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    handleClearSelectedDevice: () => void;
    handleConfirmOpen: () => void;
    confirmOpen: boolean;
    handleOpen: () => void;
    open: boolean;
}

type ChannelClientState = {
    clientChannelsState: ClientChannelsState;
    clientChannelDeviceState: ClientChannelDeviceState;
};

type IProviderProps = {children: ReactNode;}

const ChannelClientContext = createContext<ChannelClientState | null>(null);

const ClientStateProvider: FC<IProviderProps> = ({children}) => {

    const [ selectedChannel, setSelectedChannel ] = useState({
        channel: "",
        channelId: ""
    });

    const [roomTab, setRoomTab] = useState({
        tab: "device",
    });

    const handleRoomTab = useCallback((value: string) => {
        setRoomTab({tab: value});
    }, [roomTab.tab.length]);

    const [selectedDevice, setSelectedDevice] = useState<string[]>([]);

    const [handleOpen, open, setOpen] = useClick();

    const [handleConfirmOpen, confirmOpen] = useClick();

    const [handleExpand, expand] = useClick();

    const [swipeOpen, setSwipeOpen] = useState(false);

    const toggleSwipDrawer = useCallback(() => {
        setSwipeOpen((prev)=> !prev);
    }, [swipeOpen])

    const handleSelectedDeviceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setSelectedDevice((prev) => {
            if(prev.indexOf(event.target.value) !== -1) {
                prev = prev.filter((item) => item !== event.target.value)
                return [...prev]
            } else {
                return [...prev, event.target.value]
            }
        })
    }, [selectedDevice.length]);

    const handleClearSelectedDevice = useCallback(() => {
        setSelectedDevice([]);
    }, [selectedDevice.length])

    const handleIntoChannel = useCallback((channel: string, channelId: string) => {
        setSelectedChannel({
            channel: channel,
            channelId: channelId,
        });
        if(selectedDevice.length > 0) setSelectedDevice([]);
        handleRoomTab("device");
    } ,[selectedChannel.channel, selectedChannel.channelId, selectedDevice.length]);

    const handleLeaveChannel = useCallback(() => {
        setSelectedChannel({
            channel: "",
            channelId: "",
        });
        if(selectedDevice.length > 0) setSelectedDevice([]);
        handleRoomTab("device");
    } ,[selectedChannel.channel, selectedChannel.channelId, selectedDevice.length]);

    const clientChannelsState = useMemo(() => {
        return {
            selectedChannel, 
            handleIntoChannel, 
            handleLeaveChannel, 
            handleRoomTab,
            roomTab,
            handleExpand, 
            expand,
            toggleSwipDrawer,
            swipeOpen
        } as ClientChannelsState
    } ,[handleIntoChannel, handleLeaveChannel, handleRoomTab, handleOpen, handleExpand, toggleSwipDrawer,]);

    const clientChannelDeviceState = useMemo(() => {
        return {
            selectedDevice,
            handleSelectedDeviceChange,
            handleClearSelectedDevice,
            handleOpen,
            open,
            handleConfirmOpen, 
            confirmOpen,
        } as ClientChannelDeviceState
    } ,[handleSelectedDeviceChange, handleClearSelectedDevice.length, handleOpen, handleConfirmOpen,])


    return (
        <ChannelClientContext.Provider
            value={{
                clientChannelsState,
                clientChannelDeviceState,
            }}
        >
            {children}
        </ChannelClientContext.Provider>
    )
};

export default ClientStateProvider;

export const useClientChannelsState = () => {
    
    const { clientChannelsState } = useContext(ChannelClientContext) as ChannelClientState;

    return {...clientChannelsState}
};

export const useClientPttDeviceState = () => {
    
    const { clientChannelDeviceState } = useContext(ChannelClientContext) as ChannelClientState;

    return {...clientChannelDeviceState}
};