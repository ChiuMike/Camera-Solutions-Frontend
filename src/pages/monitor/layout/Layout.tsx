import { Dispatch, SetStateAction, FC, useState, useEffect } from "react";
import * as MUI from "@mui/material";
import { createPortal } from "react-dom";
import {
    closestCenter,
    defaultDropAnimation,
    defaultDropAnimationSideEffects,
    DndContext,
    DragCancelEvent,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    DropAnimation,
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
import { useAxios } from "../../../hooks/useAxios";
import { ApiUrl, ReadIotDevicesResponse } from "../../../apis/device";
import { RequestMethod } from "../../../apis/Api";
import MobileDrawer from "../../../components/drawer/MobileDrawer";
import MobileDrawerContent from "./drawer/MobileDrawerContent";
import MonitorDrawer from "./drawer/MonitorDrawer";
import MonitorWall from "./monitor-wall/MonitorWall";
import { findContainer, getIndex, isPanelId, useBoardData } from "../context/ClientProvider";
import PanelDeviceItem from "../kanban/PanelDeviceItem";
import PanelDeviceOverlay from "../kanban/PanelDeviceOverlay";
import PanelViewItem from "../kanban/PanelViewItem";

interface LayoutBaseProps {
    drawerOpen: boolean;
    setIsMap: Dispatch<SetStateAction<boolean>>
}

const Layout: FC<LayoutBaseProps> = ({drawerOpen, setIsMap}) => {

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const { boardData, activeId, handleActiveId, handleDeviceToBoardData, handlePanelItemSort, handleOverPanelSort, handleDragOver } = useBoardData();

    const [swipeOpen, setSwipeOpen] = useState(false);

    const { loading, data: iotDevice, makeRequest: listIotDevices } = useAxios<ReadIotDevicesResponse>({
        onSuccess: (response) => {
            if(response && response.data) {
                handleDeviceToBoardData(response.data);
            }
        }
    });

    const toggleSwipDrawer = () => {
        setSwipeOpen((prev)=> !prev);
    };

    useEffect(() => {
        listIotDevices({
            url: ApiUrl.readDevices(),
            method: RequestMethod.GET,
        })
    }, []);

    useEffect(() => {
        setIsMap(true);
        return () => setIsMap(false);
    }, []);

    return (
        <DndContext
            collisionDetection={closestCenter}
            sensors={sensors}
            onDragCancel={(event: DragCancelEvent) => {
                handleActiveId('');
            }}
            onDragStart={(event: DragStartEvent) => {
                const { active } = event;
                handleActiveId(active.id as string); 
            }}
            onDragOver={(event: DragOverEvent) => {
                const { active, over } = event;
                const overId = over?.id;
                const activeId = active?.id;
                handleDragOver(active, over);
            }}
            onDragEnd = {({active, over}: DragEndEvent) => {
                const over_Id = over?.id;
                const active_Id = active?.id;
                
                if (
                    findContainer(boardData, active_Id as string) === findContainer(boardData, over_Id as string) &&
                    !isPanelId(boardData, over_Id as string) && !isPanelId(boardData, active_Id as string)
                ) {
                    handlePanelItemSort(active_Id, over_Id);
                };

                if (
                    !isPanelId(boardData, active_Id as string) &&
                    findContainer(boardData, over_Id as string) &&
                    findContainer(boardData, active_Id as string) &&
                    findContainer(boardData, active_Id as string) !== findContainer(boardData, over_Id as string)
                ) {
                    handleOverPanelSort(active, over);
                }
            }}
        >
            <SortableContext
                items={[...boardData.boardPanels]}
                strategy={rectSortingStrategy}
            >
                {
                    boardData.boardPanels.map((panel, panelIndex) => {
                        if(panelIndex === 0) {
                            return (
                                <MonitorDrawer 
                                    drawerOpen={drawerOpen}
                                    iotDevices={iotDevice ? iotDevice.data : []}
                                    loading={loading}
                                    panelIndex={panelIndex}
                                    panel={panel}
                                    key={panelIndex}
                                >
                                    <SortableContext
                                        items={[...panel.panelItems]}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {
                                            boardData.boardPanels[panelIndex].panelItems.map((panelItem, itemIndex) => 
                                                <PanelDeviceItem
                                                    key={itemIndex}
                                                    itemIndex={itemIndex}
                                                    panelItem={panelItem} 
                                                />
                                            )
                                        }
                                    </SortableContext>
                                </MonitorDrawer>
                            )
                        }
                        return (
                            <MonitorWall
                                navDrawerOpen={drawerOpen}
                                mobileOpen={swipeOpen}
                                toggleSwipDrawer={toggleSwipDrawer}
                                panelIndex={panelIndex}
                                panel={panel}
                                key={panelIndex}
                            >
                                <SortableContext
                                    items={[...panel.panelItems]}
                                    strategy={rectSortingStrategy}
                                >
                                    {
                                        boardData.boardPanels[panelIndex].panelItems.map((panelItem, itemIndex) => 
                                            <PanelViewItem
                                                key={itemIndex}
                                                itemIndex={itemIndex}
                                                panelItem={panelItem} 
                                            />
                                        )
                                    }
                                </SortableContext>
                            </MonitorWall>
                        )
                    })
                }
                {/* {
                    mediaMatches 
                    ?
                    <MobileDrawer
                        drawerBleeding={56}
                        height={300}
                        toggleSwipDrawer={toggleSwipDrawer}
                        swipeOpen={swipeOpen}
                        mobileDrawerTitle={"Monitor"}
                        disableSwipeToOpen={false}
                        hideBackdrop={false}
                        puller={true}
                        renderChildren={
                            () => 
                                <MobileDrawerContent
                                    iotDevices={iotDevice ? iotDevice.data : []}
                                />
                        }
                    />
                    :
                    <MonitorDrawer 
                        drawerOpen={drawerOpen}
                        iotDevices={iotDevice ? iotDevice.data : []}
                        loading={loading}
                    />
                }
                <MonitorWall 
                    navDrawerOpen={drawerOpen}
                    mobileOpen={swipeOpen}
                    toggleSwipDrawer={toggleSwipDrawer}
                /> */}
        </SortableContext>
        {createPortal(
            <DragOverlay
                adjustScale={false}
                style={{ transformOrigin: "0 0" }}
                dropAnimation={{
                    sideEffects: defaultDropAnimationSideEffects({
                      styles: {
                        active: {
                          opacity: '0.5',
                        },
                      },
                    }),
                }}
            >
                {
                    activeId!=="" ? <PanelDeviceOverlay id={activeId}/> : null
                }
            </DragOverlay>,
            document.body
        )}
        </DndContext>
    )
};

export default Layout;