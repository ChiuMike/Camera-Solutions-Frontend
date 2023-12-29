import { createContext, ReactNode, FC, useMemo, useContext, useState, useCallback } from 'react';
import { eventType, useEventChange } from '../../../hooks/FormHooks';
import moment from 'moment';
import { IMonitorBoards, MonitorPanelItems } from '../../video-upload/type/type';
import { IDeviceDto } from '../../../apis/device';
import { Active, Over, UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

type BoardDataState = {
    activeId: string;
    handleActiveId: (id: string) => void;
    boardData: IMonitorBoards;
    handleDeviceToBoardData: (data: IDeviceDto[]) => void;
    handlePanelItemSort: (active_Id: UniqueIdentifier, over_Id?: UniqueIdentifier) => void;
    handleOverPanelSort: (active: Active, over: Over | null) => void;
    handleDragOver: (active: Active, over: Over | null) => void;
};

type ClientState = {
    boardState: BoardDataState;
}

type IProviderProps = {children: ReactNode;};

const MonitorClientContext = createContext<ClientState | null>(null);

const ClientProvider: FC<IProviderProps> = ({children}) => {

    const [ activeId, setActiveId ] = useState('');

    const [ isEnd, setIsEnd ] = useState(false);

    const [boardData, setBoardData] = useState<IMonitorBoards>({
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

    const handleActiveId = useCallback((id: string) => {
        setActiveId(id);
    }, [activeId]);

    const handleDragEnd = useCallback(() => {
        setIsEnd((prev) => !prev);
    }, [isEnd])

    const handleDeviceToBoardData = useCallback((data: IDeviceDto[]) => {

        if(data.length === 0) return;

        setBoardData((prev) => {

            data.forEach((device) => {
                let panelItem = {
                    content: device.name,
                    id: device.device_id
                }
                const existedItem = prev.boardPanels[0].panelItems.find((device) => device.content === panelItem.content);

                if(existedItem === undefined) prev.boardPanels[0].panelItems.push(panelItem);
            });

            return {...prev};
        });
        handleActiveId('');
    }, [boardData.boardPanels[0].panelItems.length]);

    const handlePanelItemSort = useCallback((active_Id: UniqueIdentifier, over_Id?: UniqueIdentifier) => {
        setBoardData((prev) => {
            const activeContainer = findContainer(boardData, active_Id as string);
            const activeItemIndex = activeContainer?.panelItems.findIndex((item) => item.id === active_Id);
            const targetItemIndex = activeContainer?.panelItems.findIndex((item) => item.id === over_Id);

            let index = getIndex(boardData, activeContainer?.id);

            if(index!== undefined && activeItemIndex!== undefined && targetItemIndex!== undefined) {

                prev.boardPanels[index].panelItems = arrayMove(
                    prev.boardPanels[index].panelItems,
                    activeItemIndex,
                    targetItemIndex
                );
            }

            return {
                ...prev,
            };
        });
    }, [activeId]);

    const handleOverPanelSort = useCallback((active: Active, over: Over | null) => {

        return;
        // const active_Id = active?.id;
        // const over_Id = over?.id;

        // const activeContainer = findContainer(boardData, active_Id as string);
        // const targetContainer = findContainer(boardData, over_Id as string);

        // const activeIndex = activeContainer?.panelItems.findIndex((item) => {
        //     return item.id === active_Id;
        // });
        
        // //drag over panel item index
        // const overIndex = targetContainer?.panelItems.findIndex((item) => {
        //     return item.id === over_Id;
        // });

        // let newIndex: number | undefined; //item new index in panel after drag
        
        // if (isPanelId(boardData, over_Id as string)) {
        //     newIndex = targetContainer?.panelItems.length;
        // } else {
        //     const isBelowOverItem =
        //         over &&
        //         active.rect.current.translated &&
        //         active.rect.current.translated.top >
        //         over.rect.top + over.rect.height;

        //     const modifier = isBelowOverItem ? 1 : 0;
        //     if (overIndex !== undefined && targetContainer !== undefined) {
        //         newIndex = overIndex >= 0 ? overIndex + modifier : targetContainer.panelItems.length + 1;
        //     }
        // };

        // let updateIndex = getIndex(boardData, targetContainer?.id); //target panel index 0 or 1
        // let updatedOverPanelItems: MonitorPanelItems[] = [];
        // let updatedActivePanelItems: MonitorPanelItems[] = [];

        // if (updateIndex !== undefined && activeIndex !== undefined) {
        //     if(activeContainer !== undefined && targetContainer) {
        //         if(newIndex !== undefined) {
        //             if(activeContainer.id=== "archiving" && targetContainer.id === "available") {
        //                 let item = boardData.boardPanels[1].panelItems[activeIndex];
        //                 setBoardData((prev) => { 
        //                     if(activeContainer === undefined) return {...prev}
                
        //                     if(activeContainer.id === "archiving") {
        //                         prev.boardPanels[1].panelItems = prev.boardPanels[1].panelItems.filter((panelItem) => item.id !== panelItem.id);
        //                         let archiveDevice = prev.boardPanels[0].panelItems.find((panelItem, index) => panelItem.content === item.content);
        //                         if(archiveDevice === undefined) prev.boardPanels[0].panelItems.unshift(item);
        //                     }
                        
        //                     return {...prev}
        //                 });
        //             } else if (activeContainer.id === "available" && targetContainer.id === "archiving"){
        //                 setBoardData((prev) => {
        //                     if(updateIndex) {
        //                         updatedOverPanelItems = [
        //                             ...prev.boardPanels[updateIndex].panelItems.slice(
        //                                 0,
        //                                 newIndex
        //                             ),
        //                             prev.boardPanels[0].panelItems[
        //                                 activeIndex
        //                             ],
        //                             ...prev.boardPanels[1].panelItems.slice(
        //                                 newIndex,
        //                                 prev.boardPanels[1].panelItems.length
        //                             ),
        //                         ];
    
        //                         //刪除被拖拉的 item
        //                         updatedActivePanelItems = prev.boardPanels[
        //                             0
        //                         ].panelItems.filter((item) => item.id !== active.id);
    
        //                         prev.boardPanels[1].panelItems = [
        //                             ...updatedOverPanelItems,
        //                         ];
    
        //                         prev.boardPanels[0].panelItems = [
        //                             ...updatedActivePanelItems,
        //                         ];
        //                     }
        //                     return {...prev}
        //                 });
        //             }
        //         }
        //     }   
        // }

    }, [boardData.boardPanels[0].panelItems.length, boardData.boardPanels[1].panelItems.length,]);

    const handleDragOver = useCallback((active: Active, over: Over | null) => {

        if(over === null) return;

        const active_Id = active.id;
        const over_Id = over.id;

        const activeContainer = findContainer(boardData, active_Id as string);
        const targetContainer = findContainer(boardData, over_Id as string);
        const updateIndex = getIndex(boardData, targetContainer?.id); //target panel index 0 or 1
        let newIndex: number | undefined;

        console.log("activeContainer...", activeContainer)
        console.log("targetContainer...", targetContainer)

        if ( !activeContainer || !targetContainer || activeContainer.id === targetContainer.id || !updateIndex) return;

        if (isPanelId(boardData, over_Id as string)) {
            newIndex = targetContainer?.panelItems.length;
        } else {
            return;
        }

        setBoardData((prev) => {

            const activeItems = activeContainer.panelItems;
            const overItems = targetContainer.panelItems;
            
            const activeIndex = activeItems.findIndex((item) => item.id === active_Id);
            const overIndex = overItems.findIndex((item) => item.id !== over_Id);

            const activeContainerIndex = activeContainer.panelItems.findIndex((item) => {
                return item.id === active_Id;
            });
           
            let updatedOverPanelItems: MonitorPanelItems[] = [];
            let updatedActivePanelItems: MonitorPanelItems[] = [];

            updatedOverPanelItems = [
                ...prev.boardPanels[activeContainerIndex].panelItems.slice(
                    0,
                    newIndex
                ),
                prev.boardPanels[0].panelItems[
                    activeIndex
                ],
                ...prev.boardPanels[1].panelItems.slice(
                    newIndex,
                    prev.boardPanels[1].panelItems.length
                ),
            ];

            //刪除被拖拉的 item
            updatedActivePanelItems = prev.boardPanels[
                0
            ].panelItems.filter((item) => item.id !== active_Id);

            prev.boardPanels[1].panelItems = [
                ...updatedOverPanelItems,
            ];

            prev.boardPanels[0].panelItems = [
                ...updatedActivePanelItems,
            ];

            return {
                ...prev,
            }
        })

    }, [boardData.boardPanels[0].panelItems.length, boardData.boardPanels[1].panelItems.length]);

    const boardState = useMemo(() => {
        return {
            activeId,
            handleActiveId,
            boardData,
            handleDeviceToBoardData,
            handlePanelItemSort,
            handleOverPanelSort,
            handleDragOver
        } as BoardDataState;
    }, [
        boardData.boardPanels[0].panelItems.length, 
        boardData.boardPanels[1].panelItems.length,
        handleDeviceToBoardData,
        handleActiveId,
        handleOverPanelSort,
        handleDragOver
    ])

    return (
        <MonitorClientContext.Provider
            value={{
                boardState
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

export const findContainer = (boardData: IMonitorBoards, id?: string) => {
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

export const getIndex = (boardData: IMonitorBoards ,id?: string) => {
    const panel = findContainer(boardData, id);
    if(panel)
        return boardData.boardPanels.indexOf(panel);
}

export const isPanelId = (boardData: IMonitorBoards, id: string) => {
    const result = boardData.boardPanels.find((panel) => {
        return panel.id === id;
    });
    return result ? true : false;
};

export default ClientProvider;