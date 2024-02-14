import { createContext, ReactNode, FC, useMemo, useContext, useState, useCallback } from 'react';
import { IDeviceDto } from '../../../apis/device';
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { BoardSections, PanelItem } from '../type/board';

const defaultVideos = [
    "/video/bike.mp4",
    "/video/bike_2.mp4",
    "/video/bus_stop.mp4",
    "/video/cross_road.mp4",
    "/video/driving-on-road.mp4",
    "/video/driving.mp4",
    "/video/girl-run.mp4",
    "/video/highway.mp4",
    "/video/rural_road.mp4",
    "/video/rural2.mp4",
]

type BoardDataState = {
    activeId: string;
    handleActiveId: (id: string) => void;
    boardData: BoardSections;
    handleDeviceToBoardData: (data: IDeviceDto[]) => void;
    handleDragStart: ({ active }: DragStartEvent) => void;
    handleDragOver: ({ active, over }: DragOverEvent) => void;
    handleDragEnd: ({ active, over }: DragEndEvent) => void;
    handleGridView: (event: React.MouseEvent<HTMLElement>, newAlignment: number) => void;
    handleMobileDeviceClick: (activeIndex: number, name: string, toggleSwipDrawer: ()=> void) => void;
    handleMobileViewClick: (activeIndex: number, name: string) => void;
    gridValue: number;
};

type LayoutState = {
    deviceFilter: string;
    anchorEl: HTMLElement | null;
    handleDeviceFilter: (filter: string) => void;
    handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
    handleMenuClose: () => void;
}

type ClientState = {
    boardState: BoardDataState;
    layoutState: LayoutState;
}

type IProviderProps = {children: ReactNode;};

const MonitorClientContext = createContext<ClientState | null>(null);

const ClientProvider: FC<IProviderProps> = ({children}) => {

    const [ activeId, setActiveId ] = useState('');

    const [gridValue, setGridValue] = useState<number>(2);

    const [boardData, setBoardData] = useState<BoardSections>({
        "device": [],
        "monitor": [],
    });

    const [deviceFilter, setDeviceFilter] = useState("");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleActiveId = useCallback((id: string) => {
        setActiveId(id);
    }, [activeId]);

    const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, [anchorEl]);

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, [anchorEl]);

    const handleDeviceFilter = useCallback((filter: string) => {
        setDeviceFilter((prev) => {
            if(filter === prev) {
                return ""
            } else {
                return filter
            }
        });
    }, [deviceFilter]);

    const handleDeviceToBoardData = useCallback((data: IDeviceDto[]) => {

        if(data.length === 0) return;

        setBoardData((prev) => {
            data.forEach((device, index) => {
                let panelItem: PanelItem = {
                    content: device.name,
                    id: device.device_id,
                    status: "device",
                    video: defaultVideos[index]
                }
                const existedDeviceItem = prev["device"].find((device) => device.content === panelItem.content);
                const existingMonitorItem = prev["monitor"].find((device) => device.content === panelItem.content);

                if(existedDeviceItem === undefined) prev["device"].push(panelItem);
                if(existingMonitorItem === undefined) 
                    prev["monitor"] = prev["monitor"].filter((device) => device.content !== panelItem.content)
            });

            return {...prev};
        });
    }, [boardData["device"].length, boardData["monitor"].length]);

    const handleDragStart = useCallback(({ active }: DragStartEvent) => {
        setActiveId(active.id as string);
    }, [activeId]);

    const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
        const activeContainer = findBoardSectionContainer(
            boardData,
            active.id as string
        );
        const overContainer = findBoardSectionContainer(
            boardData,
            over?.id as string
        );

        if (!activeContainer || !overContainer || activeContainer !== overContainer) return;
        
        const activeIndex = boardData[activeContainer].findIndex(
            (task) => task.id === active.id
        );
        const overIndex = boardData[overContainer].findIndex(
            (task) => task.id === over?.id
        );

        if (activeIndex !== overIndex) {
            setBoardData((prev) => (
                {
                    ...prev,
                    [overContainer]: arrayMove(
                        prev[overContainer],
                        activeIndex,
                        overIndex
                    ),
                }
            ));
        }
        handleActiveId("");
    }, [boardData["device"].toString(), boardData["monitor"].toString(), activeId]);

    const handleDragOver = useCallback(({ active, over }: DragOverEvent) => {

        const activeContainer = findBoardSectionContainer(boardData, active.id as string);
        const overContainer = findBoardSectionContainer(boardData, over?.id as string);

        if (!activeContainer || !overContainer || activeContainer === overContainer) return;

        setBoardData((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];
      
            // Find the indexes for the items
            const activeIndex = activeItems.findIndex(
              (item) => item.id === active.id
            );
            const overIndex = overItems.findIndex((item) => item.id !== over?.id);
      
            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item.id !== active.id)
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, overIndex),
                    prev[activeContainer][activeIndex],
                    ...prev[overContainer].slice(
                        overIndex,
                        prev[overContainer].length
                    )
                ],
            };
        });

    }, [boardData["device"].length, boardData["monitor"].length]);

    const handleMobileDeviceClick = useCallback((activeIndex: number, name: string, toggleSwipDrawer: ()=> void) => {

        if(boardData["monitor"].length === gridValue*gridValue) {
            toggleSwipDrawer();
            return;
        }

        setBoardData((prev) => {
            return {
                ...prev,
                ["device"]: [
                    ...prev["device"].filter((item) => item.content !== name)
                ],
                ["monitor"]: [
                    ...prev["monitor"].slice(0, prev["monitor"].length),
                    prev["device"][activeIndex],
                ],
            }; 
        });

    }, [boardData["device"].length, boardData["monitor"].length, gridValue]);

    const handleMobileViewClick = useCallback((activeIndex: number, name: string) => {
        setBoardData((prev) => {

            prev["device"].push(prev["monitor"][activeIndex]);

            prev["monitor"] = prev["monitor"].filter((device) => device.content !== name);
            
            return {
                ...prev
            }
        });
    }, [boardData["device"].length, boardData["monitor"].length])

    const handleGridView = useCallback((event: React.MouseEvent<HTMLElement>, newAlignment: number) => {
        if(boardData["monitor"].length <= newAlignment*newAlignment) {
            setGridValue((prev) => {
                if(newAlignment === null) {
                    return prev;
                }
                return newAlignment
            });
            return; 
        }

        setBoardData((prev) => {
            
            return {
                ...prev,
                ["device"] : [
                    ...prev["device"],
                    ...prev["monitor"].slice(newAlignment*newAlignment, prev["monitor"].length)
                ],
                ["monitor"] : [
                    ...prev["monitor"].slice(0, newAlignment*newAlignment),
                ]
            }
        });

        setGridValue((prev) => {
            if(newAlignment === null) {
                return prev;
            }
            return newAlignment
        });

    }, [boardData["device"].length, boardData["monitor"].length, gridValue]);

    const boardState = useMemo(() => {
        return {
            activeId,
            boardData,
            gridValue,
            handleActiveId,
            handleDeviceToBoardData,
            handleDragOver,
            handleDragStart,
            handleDragEnd,
            handleGridView,
            handleMobileDeviceClick,
            handleMobileViewClick
        } as BoardDataState;
    }, [
        boardData["device"].length, 
        boardData["monitor"].length,
        handleDeviceToBoardData,
        handleActiveId,
        handleDragOver,
        handleDragStart,
        handleDragEnd,
        handleGridView,
        handleMobileDeviceClick,
        handleMobileViewClick
    ]);

    const layoutState = useMemo(() => {
        return {
            deviceFilter,
            anchorEl,
            handleDeviceFilter,
            handleMenuOpen,
            handleMenuClose
        } as LayoutState;
    }, [handleDeviceFilter, handleMenuOpen, handleMenuClose])

    return (
        <MonitorClientContext.Provider
            value={{
                boardState,
                layoutState
            }}
        >
            {children}
        </MonitorClientContext.Provider>
    )
};

export const useBoardData = () => {
    const { boardState } = useContext(MonitorClientContext) as ClientState;
    return { ...boardState };
};

export const useLayoutState = () => {
    const { layoutState } = useContext(MonitorClientContext) as ClientState;
    return { ...layoutState };
};

export const findBoardSectionContainer = (boardSections: BoardSections, id: string) => {
    if (id in boardSections) {
      return id;
    }

    const container = Object.keys(boardSections).find((key) =>
        boardSections[key].find((item) => item.id === id)
    );
    return container;
};

export default ClientProvider;