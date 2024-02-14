import { Dispatch, SetStateAction, FC, useState, useEffect } from "react";
import * as MUI from "@mui/material";
import { createPortal } from "react-dom";
import {
    closestCenter,
    defaultDropAnimationSideEffects,
    DndContext,
    DragCancelEvent,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useAxios } from "../../../hooks/useAxios";
import { ApiUrl, ReadIotDevicesResponse } from "../../../apis/device";
import { RequestMethod } from "../../../apis/Api";
import MobileDrawer from "../../../components/drawer/MobileDrawer";
import MobileDrawerContent from "./drawer/MobileDrawerContent";
import MonitorDrawer from "./drawer/MonitorDrawer";
import MonitorWall from "./monitor-wall/MonitorWall";
import { useBoardData } from "../context/ClientProvider";
import PanelDeviceOverlay from "../kanban/PanelDeviceOverlay";
import { useEventChange } from "../../../hooks/FormHooks";

interface LayoutBaseProps {
    drawerOpen: boolean;
    setIsMap: Dispatch<SetStateAction<boolean>>
}

const Layout: FC<LayoutBaseProps> = ({drawerOpen, setIsMap}) => {

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');

    const [swipeOpen, setSwipeOpen] = useState(false);

    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    const { activeId, handleActiveId, handleDeviceToBoardData, handleDragOver, handleDragStart, handleDragEnd } = useBoardData();

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
        });
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
                handleDragStart(event)
            }}
            onDragOver={(event: DragOverEvent) => {
                handleDragOver(event);
            }}
            onDragEnd = {(event: DragEndEvent) => {
                handleDragEnd(event);
            }}
        >
            {
                mediaMatches 
                ?
                <MobileDrawer
                    drawerBleeding={56}
                    height={300}
                    toggleSwipDrawer={toggleSwipDrawer}
                    swipeOpen={swipeOpen}
                    mobileDrawerTitle={"Monitor Device"}
                    disableSwipeToOpen={false}
                    hideBackdrop={false}
                    puller={false}
                    renderChildren={
                        () => 
                            <MobileDrawerContent toggleSwipDrawer={toggleSwipDrawer} />
                    }
                />
                :
                <MonitorDrawer 
                    drawerOpen={drawerOpen}
                    loading={loading}
                    handleInputChange={handleInputChange}
                    inputFields={inputFields}
                />
            }
            <MonitorWall
                navDrawerOpen={drawerOpen}
                mobileOpen={swipeOpen}
                toggleSwipDrawer={toggleSwipDrawer}
            />
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
                        activeId!== "" ? <PanelDeviceOverlay id={activeId}/> : null
                    }
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    )
};

export default Layout;