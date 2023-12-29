import { useState, Dispatch, SetStateAction, createContext, FC } from 'react';
import useClick from '../../../hooks/useClick';
import { TimePeriod } from '../../../types/web';

export type TrackState = {
    selectedDate: Date | null;
    setSelectedDate: Dispatch<SetStateAction<Date | null>>;
    timelineOpen: boolean;
    timePeriod: TimePeriod;
    setTimePeriod: Dispatch<SetStateAction<TimePeriod>>;
    selectedDevice: string;
    bottomOpen: boolean;
    selectedIndex: number;
    viewRoute: boolean;
    viewMarkers: boolean;
    play: boolean;
    mode: string;
    disabled: boolean;
    setMode: Dispatch<SetStateAction<string>>;
    handleViewRoute: () => void;
    handleViewMarkers: () => void;
    handlePlay: () => void;
    setSelectedIndex: Dispatch<SetStateAction<number>>;
    handleSelectDevice: (device: string, mode: string) => void;
    backToDeviceList: () => void;
    handleBottomOpen: () => void;
    handleDisabled: () => void;
    deviceFilter: string;
    handleDeviceFilter: (filter: string) => void;
};

type IProviderProps = {children: React.ReactNode;}

export const TrackStateContext = createContext<TrackState | null>(null);

const TrackStateProvider: FC<IProviderProps> = ({children}) => {

    const [timelineOpen, setTimelineOpen] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [selectedDevice, setSelectedDevice] = useState("");

    const [bottomOpen, setBottomOpen] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const [timePeriod, setTimePeriod] = useState<TimePeriod>({
        actionStart: '',
        actionEnd: ''
    });

    const [deviceFilter, setDeviceFilter] = useState("");

    const [handleViewRoute, viewRoute] = useClick();

    const [handleViewMarkers, viewMarkers] = useClick();

    const [handlePlay, play] = useClick();

    const [handleDisabled, disabled] = useClick();

    const [mode, setMode] = useState("");

    const handleSelectDevice = (device: string, mode: string) => {
        setTimelineOpen(true);
        setSelectedDevice(device);
        setMode(mode);
    };

    const backToDeviceList = () => {
        setBottomOpen(false);
        setTimelineOpen(false);
        setSelectedDate(null);
        setTimePeriod({
            actionStart: '',
            actionEnd: ''
        });
        setMode("");
    };

    const handleBottomOpen = () => {
        setBottomOpen(true);
    };

    const handleDeviceFilter = (filter: string) => {
        setDeviceFilter((prev) => {
            if(filter === prev) {
                return ""
            } else {
                return filter
            }
        });
    };

    return (
        <TrackStateContext.Provider
            value={{
                timelineOpen,
                selectedDate,
                setSelectedDate,
                selectedDevice,
                bottomOpen,
                handleSelectDevice,
                mode, 
                setMode,
                backToDeviceList,
                handleBottomOpen,
                timePeriod, 
                setTimePeriod,
                selectedIndex, 
                setSelectedIndex,
                viewRoute,
                viewMarkers,
                play,
                handleViewRoute,
                handleViewMarkers,
                handlePlay,
                handleDisabled, 
                disabled,
                deviceFilter,
                handleDeviceFilter,
            }}
        >
            {children}
        </TrackStateContext.Provider>
    )
};

export default TrackStateProvider;