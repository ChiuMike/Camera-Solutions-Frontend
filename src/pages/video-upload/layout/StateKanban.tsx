import {FC, useState } from "react";
import { createPortal } from "react-dom";
import {
    closestCenter,
    defaultDropAnimation,
    DndContext,
    DragCancelEvent,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { PanelItemsType } from "../type/type";
import { findContainer, getIndex, isPanelId, useBoardData, useClientSearch, useClientState } from "../context/ClientProvider";
import { useLayoutState } from "../context/LayoutProvider";
import Panel from "../kanban/Panel";
import PanelItem from "../kanban/PanelItem";
import PanelItemOverlay from "../kanban/PanelItemOverlay";

const StateKanban: FC = () => {

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const { handleClearDeviceState, handleSelectDevice } = useClientState();
    const { handleDatePickerOpen } = useLayoutState();
    const { availableSearch, archiveSearch } = useClientSearch();
    const { boardData, setBoardData, handleToAvailable } = useBoardData();
    const [ activeId, setActiveId ] = useState('');

    return (
        <DndContext
            collisionDetection={closestCenter}
            sensors={sensors}
            onDragCancel={(event: DragCancelEvent) => {
                setActiveId('');
                // handleDatePickerOpen();
            }}
            onDragStart={(event: DragStartEvent) => {
                const { active } = event;
                setActiveId(active.id as string); 
            }}
            onDragOver={(event: DragOverEvent) => {
                const { active, over } = event;
                const overId = over?.id;
                const activeId = active?.id;
            }}
            onDragEnd = {({ active, over, }: DragEndEvent) => {
                const overId = over?.id;
                const activeId = active?.id;

                if (
                    findContainer(boardData, activeId as string) === findContainer(boardData, overId as string) &&
                    !isPanelId(boardData, overId as string) &&
                    !isPanelId(boardData, activeId as string)
                ) {
                    setBoardData((prev) => {
                        const activeContainer = findContainer(boardData, activeId as string);
                        const activeItemIndex = activeContainer?.panelItems.findIndex(
                            (item) => {
                                return item.id === active.id;
                            }
                        );
            
                        const targetItemIndex = activeContainer?.panelItems.findIndex(
                            (item) => {
                            return item.id === over?.id;
                            }
                        );
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
                };

                // only for items between panels
                if (
                    !isPanelId(boardData, activeId as string) &&
                    findContainer(boardData, overId as string) &&
                    findContainer(boardData, activeId as string) &&
                    findContainer(boardData, activeId as string) !== findContainer(boardData, overId as string)
                ) {
                    const activeContainer = findContainer(boardData, activeId as string);
                    const targetContainer = findContainer(boardData, overId as string);

                    const activeIndex = activeContainer?.panelItems.findIndex((item) => {
                        return item.id === activeId;
                    });
                    
                    //drag over panel item index
                    const overIndex = targetContainer?.panelItems.findIndex((item) => {
                        return item.id === overId;
                    });

                    let newIndex: number | undefined; //item new index in panel after drag

                    if (isPanelId(boardData, overId as string)) {
                        newIndex = targetContainer?.panelItems.length;
                    } 
                    else {
                        const isBelowOverItem =
                            over &&
                            active.rect.current.translated &&
                            active.rect.current.translated.top >
                            over.rect.top + over.rect.height;

                        const modifier = isBelowOverItem ? 1 : 0;
                        if (overIndex !== undefined && targetContainer !== undefined) {
                            newIndex = overIndex >= 0 ? overIndex + modifier : targetContainer.panelItems.length + 1;
                        }
                    };

                    let updateIndex = getIndex(boardData, targetContainer?.id); //target panel index 0 or 1
                    let updatedOverPanelItems: PanelItemsType[] = [];
                    let updatedActivePanelItems: PanelItemsType[] = [];
                    let target = -1;

                    if (updateIndex !== undefined && activeIndex !== undefined) {
                        if(activeContainer !== undefined && targetContainer) {
                            if(newIndex !== undefined) {
                                if(activeContainer.id=== "archiving" && targetContainer.id === "available") {
                                    let item = boardData.boardPanels[1].panelItems[activeIndex];
                                    item.status = "ready";
                                    item.viewing = false;
                                    handleToAvailable(item)
                                } else if (activeContainer.id === "available" && targetContainer.id === "archiving"){
                                    setBoardData((prev) => {
                                        if(updateIndex) {
                                            //一次只能有一個 wait
                                            target = prev.boardPanels[1].panelItems.findIndex((panelItem) => panelItem.status === "wait");
                                            let waitItemIndex = prev.boardPanels[1].panelItems.findIndex((device)=> device.viewing === true);
                                            if(waitItemIndex !== -1) {
                                                prev.boardPanels[1].panelItems[waitItemIndex].viewing = false;
                                            }

                                            prev.boardPanels[0].panelItems[activeIndex].status = "wait";
                                            prev.boardPanels[0].panelItems[activeIndex].viewing = false;
                                            let device = prev.boardPanels[0].panelItems[activeIndex].content
                                            handleClearDeviceState();
                                            handleSelectDevice(device);

                                            updatedOverPanelItems = [
                                                ...prev.boardPanels[updateIndex].panelItems.slice(
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
                                            ].panelItems.filter((item) => item.id !== active.id);
                
                                            prev.boardPanels[1].panelItems = [
                                                ...updatedOverPanelItems,
                                            ];
                
                                            prev.boardPanels[0].panelItems = [
                                                ...updatedActivePanelItems,
                                            ];
                
                                            if(target !== -1) {
                                                prev.boardPanels[1].panelItems[target].status = "ready";
                                                prev.boardPanels[1].panelItems[target].viewing = false;
                                                prev.boardPanels[0].panelItems.unshift(prev.boardPanels[1].panelItems[target]);
                                                prev.boardPanels[1].panelItems.splice(target, 1);
                                            }
                                        }
                                        return {...prev}
                                    });
                                }
                            }
                        }   
                    }
                }

                // Only for column sorting
                if (isPanelId(boardData, activeId as string)) {
                    setBoardData((prev) => {
                        const activeContainer = findContainer(boardData, activeId as string);
                        const targetContainer = findContainer(boardData, overId as string);
            
                        const activeContainerIndex = getIndex(boardData, activeContainer?.id);
                        const targetContainerIndex = getIndex(boardData, targetContainer?.id);
                        
                        if(activeContainerIndex!== undefined && targetContainerIndex!== undefined) {
                            return { ...prev, boardPanels: arrayMove(
                                prev.boardPanels,
                                activeContainerIndex,
                                targetContainerIndex
                            )};
                        }  
                        return {...prev}
                    });
                }
            }}
        >
            <SortableContext
                items={[...boardData.boardPanels]}
                strategy={rectSortingStrategy}
            >
                {boardData.boardPanels.map((panel, panelIndex) => (
                    <Panel
                        key={panelIndex}
                        panelIndex={panelIndex}
                        panel={panel}
                    >
                        <SortableContext
                            items={[...panel.panelItems]}
                            strategy={verticalListSortingStrategy}
                        >
                            {
                                boardData.boardPanels[panelIndex].panelItems
                                .filter((card) => {
                                    if(availableSearch.length === 0 ) return card;
                                    return (card.content.includes(availableSearch))
                                })
                                .filter((card) => {
                                    if(archiveSearch.length === 0) return card;
                                    return (card.content.includes(archiveSearch))
                                })
                                .map((card, cardIndex) => (
                                    <PanelItem
                                        key={cardIndex}
                                        cardIndex={cardIndex}
                                        card={card}
                                    />
                                ))
                            }
                        </SortableContext>
                    </Panel>
                ))}
            </SortableContext>
            {createPortal(
                <DragOverlay
                    adjustScale={false}
                    dropAnimation={{
                        ...defaultDropAnimation,
                    }}
                >
                    {
                        activeId ? <PanelItemOverlay id={activeId}/> : null
                    }
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    )
};

export default StateKanban;