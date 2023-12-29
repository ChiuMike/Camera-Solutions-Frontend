import { useEffect, useRef, useState } from "react";
import * as MUI from "@mui/material";
import { Timeline, TimelineRow, TimelineAction, TimelineState } from '@xzdarcy/react-timeline-editor';
import { useBoardData, useClientState } from "../context/ClientProvider";
import { ProgressBarContainer, TimelineContainer } from "../style/timeline/Timeline.styles";
import { checkIsViewing } from "./SelectDate";
import { mockData, mockEffect, RangeSlider, TimelineScale } from "../../../components/timeline";
import { PanelItemsType } from "../type/type";

export const checkViewingDevice = (panelItems: PanelItemsType[]) => {
    const target = panelItems.find((device)=> device.viewing === true);
    if(target) {
        return target
    }
    return {
        content: "",
        id: "",
        status: "",
        viewing: false
    }
};

const UploadTimeline = () => {

    const { deviceState, handleTimelineClick, handleTimelineClear, handleClearDeviceState } = useClientState();
    const { boardData, handleToAvailable} = useBoardData();
    const { customRange: range, selectedDevice, selectedDate } = deviceState;

    const domRef = useRef<TimelineState>(null);
    const idRef = useRef(0);
    const uploadTimer = useRef<NodeJS.Timeout>();

    const [data, setData] = useState(mockData);
    const [counter, setCounter] = useState(0);

    const handleChange = (editorData: TimelineRow[]) => {
        setData(editorData);
    };

    useEffect(() => {
        if(selectedDate !== null) return;

        setData([{ id: "0", actions: []}]);

        return () => {
            setData([{ id: "0", actions: []}]);
        }
    }, [selectedDevice, selectedDate]);

    useEffect(() => {

        if(range.end === -1 ) return;
        if(range.start === -1) return;

        let start = range.start*60*60;
        let end = range.end*60*60;

        setData((pre) => {
            return [
                {
                    id: "1",
                    actions: [
                        {
                          id: "action1",
                          start: start,
                          end: end,
                          effectId: "effect1",
                        }
                    ],
                }
            ]
        });
        if(domRef !== undefined && domRef.current !== null) {
            const left = (start) * (160 / 600) - (domRef.current.target.clientWidth / 2) + 20;
            domRef.current?.setScrollLeft(left);
        }
    }, [range.end, range.start]);
    
    useEffect(() => {
        if(checkViewingDevice(boardData.boardPanels[1].panelItems).content === "") {
            if(uploadTimer.current) {
                clearInterval(uploadTimer.current);
            }
            setCounter(0);
            return;
        };

        if(uploadTimer.current) {
            clearInterval(uploadTimer.current);
            setCounter(0);
        }

        uploadTimer.current = setInterval(() => {
            setCounter((prev) => prev += 5);
        }, 3000);
        
    }, [checkViewingDevice(boardData.boardPanels[1].panelItems).content]);

    useEffect(() => {
        const target = checkViewingDevice(boardData.boardPanels[1].panelItems)

        if(counter >= 100 && target.content !== "") {
            if(uploadTimer.current) clearInterval(uploadTimer.current);
            setCounter(0);
            handleToAvailable(target);
            handleClearDeviceState();
            handleTimelineClear();
        }

    }, [counter])

    return (
        <TimelineContainer view={checkIsViewing(boardData.boardPanels[1].panelItems)}>
            <ProgressBarContainer view={checkIsViewing(boardData.boardPanels[1].panelItems)}>
                <MUI.Box className="progress-box">
                    <MUI.Box className="bar-rate" sx={{width: `${((counter/100)*100).toFixed(1)}%`}}>
                        <p className="percent">{((counter/100)*100).toFixed(1)}%</p>
                    </MUI.Box>
                </MUI.Box>
            </ProgressBarContainer>
            <Timeline
                ref={domRef}
                onChange={handleChange}
                autoScroll={true}
                editorData={data}
                effects={mockEffect}
                scale={600}
                startLeft={20}
                scaleSplitCount={10}
                scaleWidth={160}
                getScaleRender={(scale) => <TimelineScale scale={scale}/>}
                minScaleCount={144}
                maxScaleCount={144}
                gridSnap={true}
                hideCursor={false}
                dragLine={true}
                autoReRender={true}
                onDoubleClickRow={(e, {row, time}) => {
                    if(row.actions.length === 0) {
                        setData((pre) => {
                            const rowIndex = pre.findIndex(item => item.id === row.id);
                            const newAction: TimelineAction = {
                                id: `action${idRef.current++}`,
                                start: time,
                                end: time + 600,
                                effectId: "effect0",
                            }
                            pre[rowIndex] = {...row, actions: row.actions.concat(newAction)};
                            return [...pre];
                        })
                    } else {
                        setData((pre) => {
                            return [
                                {
                                    id: "0",
                                    actions: [],
                                }
                            ]
                        });

                        handleTimelineClear();
                    }
                    
                }}
                getActionRender={(action) => {
                    return (
                        <>
                            <RangeSlider
                                action={action} 
                                handleRangeSlide={handleTimelineClick}
                            />
                        </>
                    )
                }}
            />
        </TimelineContainer>
    )
};

export default UploadTimeline;