import { createContext, ReactNode, FC, useMemo, useContext, useState, useCallback } from 'react';
import { TimelineAction } from '@xzdarcy/react-timeline-editor';
import { TimePeriod, TimeRange } from '../../../types/web';
import { eventType, useEventChange } from '../../../hooks/FormHooks';
import moment from 'moment';
import { IDefaultBoards, PanelItemsType } from '../type/type';

type DeviceState = {
    selectedDevice: string;
    selectedDate: Date | null;
    timePeriod: TimePeriod;
    customRange: TimeRange;
};

type DeviceSearch = {
    availableSearch: string;
    handleAvailableInpuChange: (event: eventType) => void;
    archiveSearch: string;
    handleAvchiveInputInputChange: (event: eventType) => void;
}

type SelectedDeviceState = {
    deviceState: DeviceState;
    handleSelectDevice: (device: string) => void;
    handleDateInput: (value: any) => void;
    handleTimelineClick: (action: TimelineAction) => void;
    handleCustomRange: (start: number, end: number) => void
    handleTimelineClear: () => void;
    handleClearDeviceState: () => void;
}

type BoardState = {
    boardData: IDefaultBoards;
    setBoardData: React.Dispatch<React.SetStateAction<IDefaultBoards>>;
    handleWaitBoardData: (item: PanelItemsType) => void;
    handleArchiveBoardData: (item: PanelItemsType) => void;
    handleReadyBoardData: (item: PanelItemsType) => void;
    handleToArchive: () => void;
    handleToAvailable: (item: PanelItemsType) => void;
}

type ClientState = {
    clientState: SelectedDeviceState;
    clientSearchState: DeviceSearch;
    clientBoardState: BoardState
};

type IProviderProps = {children: ReactNode;}

const VideoClientContext = createContext<ClientState | null>(null);

const ClientProvider: FC<IProviderProps> = ({children}) => {

    const [deviceState, setDeviceState] = useState<DeviceState>({
        selectedDevice: "",
        selectedDate: null,
        timePeriod: {actionStart: '', actionEnd: ''},
        customRange: {start: -1, end: -1}
    });

    const [boardData, setBoardData] = useState<IDefaultBoards>({
        boardPanels: [
            {
                id: "available",
                title: "Available",
                position: 0,
                panelItems: [],
            },
            {
                id: "archiving",
                title: "Archiving",
                position: 1,
                panelItems: [],
            },
        ]
    });

    const [handleAvailableInpuChange, availableInput] = useEventChange({ search: ''});
    const [handleAvchiveInputInputChange, archiveInput] = useEventChange({ search: ''});
   
    const handleClearDeviceState = () => {
        setDeviceState((prev) => {
            return {
                selectedDevice: "",
                selectedDate: null,
                timePeriod: {actionStart: '', actionEnd: ''},
                customRange: {start: -1, end: -1}
            }
        })
    };

    const handleSelectDevice = useCallback((device: string) => {
        setDeviceState((prev) => {
            return {
                ...prev,
                selectedDevice: device
            }
        })
    }, [deviceState.selectedDevice]);

    const handleDateInput = useCallback((value: any) => {
        setDeviceState((prev) => {
            return {
                ...prev,
                selectedDate: value
            }
        })
    }, [deviceState.selectedDate]);

    const handleTimelineClick = useCallback((action: TimelineAction) => {
        setDeviceState((prev) => {
            return {
                ...prev,
                timePeriod: {
                    actionStart: moment.utc(action.start*1000).format('HH:mm:00'),
                    actionEnd: moment.utc(action.end*1000).format('HH:mm:00')
                }
            }
        })
    }, [deviceState.timePeriod.actionStart, deviceState.timePeriod.actionEnd]);

    const handleTimelineClear = useCallback(() => {
        setDeviceState((prev) => {
            return {
                ...prev,
                timePeriod: {
                    actionStart: "",
                    actionEnd: ""
                }
            }
        })
    }, [deviceState.timePeriod.actionStart, deviceState.timePeriod.actionEnd]);

    const handleCustomRange = useCallback((start: number, end: number) => {
        setDeviceState((prev) => {
            return {
                ...prev,
                customRange: {
                    start: start,
                    end: end
                }
            }

        })
    }, [deviceState.customRange.start, deviceState.customRange.end]);

    const handleWaitBoardData = useCallback((item: PanelItemsType) => {

        const activeContainer = findContainer(boardData, item.id);
        const activeContainerIndex = getIndex(boardData, activeContainer?.id);

        handleClearDeviceState();

        setBoardData((prev) => {

            if(activeContainer === undefined) return {...prev}
            if(activeContainerIndex === undefined) return {...prev}

            let index = prev.boardPanels[1].panelItems.findIndex((panelItem) => panelItem.content === item.content);

            if(activeContainer.id === "archiving") {
                if(index !== -1) {
                    prev.boardPanels[1].panelItems[index].status = "ready";
                    prev.boardPanels[1].panelItems[index].viewing = false;
                }

                if(activeContainerIndex === 1) {
                    prev.boardPanels[activeContainerIndex].panelItems = prev.boardPanels[activeContainerIndex].panelItems.filter((panelItem) => item.id !== panelItem.id);
                    if(prev.boardPanels[0].panelItems.findIndex((device) => item.content === device.content) === -1)
                        prev.boardPanels[0].panelItems.unshift(item);
                }
            }

            return {
                ...prev
            }
        })

    }, [boardData.boardPanels[0].panelItems.length, boardData.boardPanels[1].panelItems.length]);

    const handleArchiveBoardData = useCallback((item: PanelItemsType) => {

        const activeContainer = findContainer(boardData, item.id);
        const activeContainerIndex = getIndex(boardData, activeContainer?.id);

        setBoardData((prev) => {

            if(activeContainer === undefined) return {...prev}
            if(activeContainerIndex === undefined) return {...prev}

            if(activeContainer.id === "archiving") {
                handleClearDeviceState();
                let index = prev.boardPanels[1].panelItems.findIndex((panelItem) => panelItem.content === item.content)
                if(item.viewing === false) {
                    if(index !== -1) prev.boardPanels[1].panelItems[index].viewing = true;

                    let viewingItemIndex = prev.boardPanels[1].panelItems.findIndex((panelItem) => (panelItem.viewing === true && panelItem.content !== item.content));
                    if(viewingItemIndex !== -1) {
                        prev.boardPanels[1].panelItems[viewingItemIndex].viewing = false;
                    }
                    handleSelectDevice(item.content);
                } else {
                    handleClearDeviceState();
                    let hasWaitDevice = boardData.boardPanels[1].panelItems.find((device)=> device.status === "wait");
                    if(index !== -1) prev.boardPanels[1].panelItems[index].viewing = false;
                    if(hasWaitDevice) {
                        handleSelectDevice(hasWaitDevice.content);
                    }
                }
            }

            return {
                ...prev
            }
        })

    }, [deviceState.selectedDevice, deviceState.selectedDate]);

    const handleReadyBoardData = useCallback((item: PanelItemsType) => {

        const activeContainer = findContainer(boardData, item.id);
        const activeContainerIndex = getIndex(boardData, activeContainer?.id);

        setBoardData((prev) => {

            if(activeContainer === undefined) return {...prev}
            if(activeContainerIndex === undefined) return {...prev}

            let index = prev.boardPanels[0].panelItems.findIndex((panelItem) => panelItem.content === item.content);

            if (activeContainer.id === "available") {

                prev.boardPanels[0].panelItems[index].status = "wait";
                prev.boardPanels[0].panelItems[index].viewing = false;

                let viewingDeviceIndex = boardData.boardPanels[1].panelItems.findIndex((device)=> device.viewing === true);

                if(viewingDeviceIndex!== -1){
                    handleClearDeviceState();
                    boardData.boardPanels[1].panelItems[viewingDeviceIndex].viewing = false;
                }

                if(activeContainerIndex === 0) {
                    let target = prev.boardPanels[1].panelItems.findIndex((panelItem) => panelItem.status === "wait");

                    if(target !== -1) {
                        prev.boardPanels[1].panelItems[target].status = "ready"
                        prev.boardPanels[activeContainerIndex].panelItems.unshift(prev.boardPanels[1].panelItems[target]);
                        prev.boardPanels[1].panelItems.splice(target, 1);
                    }

                    prev.boardPanels[activeContainerIndex].panelItems = prev.boardPanels[0].panelItems.filter((panelItem) => item.id !== panelItem.id);
                    prev.boardPanels[1].panelItems.push(item);

                    handleSelectDevice(item.content);

                }
            }
            
            return {...prev, }
        });

    }, [boardData.boardPanels[0].panelItems.length, boardData.boardPanels[1].panelItems.length]);

    const handleToArchive = useCallback(() => {
        setBoardData((prev) => {
            let waitDeviceIndex = prev.boardPanels[1].panelItems.findIndex((item) => item.content === deviceState.selectedDevice);
            if(waitDeviceIndex  !== -1) {
                prev.boardPanels[1].panelItems[waitDeviceIndex].status = "archiving"
                prev.boardPanels[1].panelItems[waitDeviceIndex].viewing = true;
            };

            return {...prev}
        });
    }, [deviceState.selectedDevice]);

    const handleToAvailable = useCallback((item: PanelItemsType) => {

        const activeContainer = findContainer(boardData, item.id);

        setBoardData((prev) => { 
            if(activeContainer === undefined) return {...prev}

            if(activeContainer.id === "archiving") {
                item.status = "ready";
                item.viewing = false;
                prev.boardPanels[1].panelItems = prev.boardPanels[1].panelItems.filter((panelItem) => item.id !== panelItem.id);
                let archiveDevice = prev.boardPanels[0].panelItems.find((panelItem, index) => panelItem.content === item.content);
                if(archiveDevice === undefined) prev.boardPanels[0].panelItems.unshift(item);
            }
        
            return {...prev}
        });
    }, [boardData.boardPanels[0].panelItems.length, boardData.boardPanels[1].panelItems.length])

    const clientState = useMemo(() => {
        return {
            deviceState, 
            handleClearDeviceState, 
            handleSelectDevice, 
            handleDateInput, 
            handleTimelineClick, 
            handleCustomRange, 
            handleTimelineClear
        } as SelectedDeviceState;
    }, [handleSelectDevice, handleDateInput, handleTimelineClick, handleCustomRange, handleTimelineClear]);

    const clientSearchState = useMemo(() => {

        const availableSearch = availableInput.search;
        const archiveSearch = archiveInput.search;

        return {
            availableSearch, handleAvailableInpuChange, archiveSearch, handleAvchiveInputInputChange, 
        } as DeviceSearch;
    }, [availableInput.search, archiveInput.search]);

    const clientBoardState = useMemo(() => {
        return {
            boardData,
            setBoardData,
            handleWaitBoardData,
            handleArchiveBoardData,
            handleReadyBoardData,
            handleToArchive,
            handleToAvailable
        } as BoardState;
    }, [
        boardData.boardPanels[0].panelItems, 
        boardData.boardPanels[1].panelItems,
        handleReadyBoardData,
        handleWaitBoardData,
        handleToArchive,
        handleToAvailable,
        handleArchiveBoardData
    ]);

    return (
        <VideoClientContext.Provider
            value={{
                clientState,
                clientSearchState,
                clientBoardState
            }}
        >
            {children}
        </VideoClientContext.Provider>
    )
};

export const useClientState = () => {
    const { clientState } = useContext(VideoClientContext) as ClientState;
    return { ...clientState }
}

export const useClientSearch = () => {
    const { clientSearchState } = useContext(VideoClientContext) as ClientState;
    return { ...clientSearchState };
};

export const useBoardData = () => {
    const { clientBoardState } = useContext(VideoClientContext) as ClientState;
    return { ...clientBoardState };
};

export const findContainer = (boardData: IDefaultBoards, id?: string) => {
    const preResult = boardData.boardPanels.find((panel) => {
        return panel.panelItems.find((item) => {
            return item.id === id;
        });
    });
    
    //for reorder column
    if (preResult) {
        return preResult;
    } else {
        return boardData.boardPanels.find((panel) => {
            return panel.id === id;
        });
    }
};

export const getIndex = (boardData: IDefaultBoards ,id?: string) => {
    const panel = findContainer(boardData, id);
    if(panel)
        return boardData.boardPanels.indexOf(panel);
}

export const isPanelId = (boardData: IDefaultBoards, id: string) => {
    const result = boardData.boardPanels.find((panel) => {
        return panel.id === id;
    });
    return result ? true : false;
};

export default ClientProvider;