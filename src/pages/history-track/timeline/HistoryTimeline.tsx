import { useEffect, useRef, useState, useContext, FC } from "react";
import * as MUI from "@mui/material";
import { Timeline, TimelineRow, TimelineAction } from '@xzdarcy/react-timeline-editor';
import * as MuiIcons from "@mui/icons-material/";
import moment from "moment";
import { HistoryMapButton } from "../style/HistoryMap.styles";
import { TrackStateContext, TrackState } from "../context/TrackStateProvider";
import { mockData, mockEffect, RangeSlider, TimelineScale } from "../../../components/timeline";

const HistoryTimeline: FC = () => {

    const domRef = useRef<HTMLDivElement>();
    const idRef = useRef(0);

    const [data, setData] = useState(mockData);
    const { setTimePeriod, selectedDevice, handleViewRoute, viewRoute, viewMarkers, handleViewMarkers, play, handlePlay, bottomOpen, setSelectedIndex, selectedIndex, disabled } = useContext(TrackStateContext) as TrackState;   

    const handleChange = (editorData: TimelineRow[]) => {
        setData(editorData);
    }

    useEffect(() => {
        if(!bottomOpen) return;
        setData([{ id: "0", actions: [],}]);
        setTimePeriod({
            actionStart: '',
            actionEnd: ''
        })
        return () => {
            setData([{ id: "0", actions: [],}]);
            setTimePeriod({
                actionStart: '',
                actionEnd: ''
            })
        };
    } ,[bottomOpen]);

    const handleTimePeriod = (action: TimelineAction) => {
        if(play === true) handlePlay();
        if(selectedIndex !== -1) setSelectedIndex(-1);
        setTimePeriod({
            actionStart: moment.utc(action.start*1000).format('HH:mm'),
            actionEnd: moment.utc(action.end*1000).format('HH:mm')
        });   
    }

    return (
        <MUI.Box className="time-line-list">
            <MUI.Box
                ref={domRef}
                style={{ overflow: 'overlay'}}
                className={'timeline-list'}
            >
                <MUI.Box className="list-header">
                    <MUI.Typography>
                        {selectedDevice}
                    </MUI.Typography>
                </MUI.Box>
                <MUI.Divider flexItem/>
                <MUI.Box className="timeline-list-item">
                    <MUI.Box className="control-box">
                        <HistoryMapButton isOpen={viewRoute} onClick={handleViewRoute}>
                            <MuiIcons.Route />
                        </HistoryMapButton>
                        <MUI.Divider orientation="vertical" flexItem />
                        <HistoryMapButton isOpen={viewMarkers} onClick={handleViewMarkers} disabled={disabled}>
                            <MuiIcons.Timeline />
                        </HistoryMapButton>
                        <MUI.Divider orientation="vertical" flexItem />
                        <HistoryMapButton isOpen={play} onClick={handlePlay} disabled={disabled}>
                            <MuiIcons.PlayArrow />
                        </HistoryMapButton>
                    </MUI.Box>
                </MUI.Box>
            </MUI.Box>
            <MUI.Divider orientation="vertical" flexItem />
            <Timeline
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

                        setTimePeriod({
                            actionStart: '',
                            actionEnd: ''
                        });

                        if(play) handlePlay();
                    }
                    
                }}
                getActionRender={(action, row) => {
                    return (
                        <>
                            <RangeSlider
                                action={action} 
                                handleRangeSlide={handleTimePeriod}
                            />
                        </>
                    )
                }}
            />
        </MUI.Box>
    )
}

export default HistoryTimeline;

