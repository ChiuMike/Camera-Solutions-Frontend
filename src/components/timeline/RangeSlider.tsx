import { useEffect, FC } from "react";
import { TimelineAction } from '@xzdarcy/react-timeline-editor';
import * as MUI from "@mui/material";
import { useDebounce } from "../../hooks/useDebounce";

interface RangeSliderBaseProps {
    action: TimelineAction; 
    handleRangeSlide: (action: TimelineAction) => void;
};

const RangeSlider: FC<RangeSliderBaseProps> = ({action, handleRangeSlide}) => {

    const func = useDebounce(handleRangeSlide);

    useEffect(() => {
        func(action);
    }, [action.end, action.start])

    return (
        <MUI.Box className={'effect-area'}>
            <MUI.Box className={'draggable-area-left'}>
                <MUI.Box className={'draggable-line'}></MUI.Box>
                <MUI.Box className={'draggable-line'}></MUI.Box>
            </MUI.Box>
            <MUI.Box className={`effect-text`}>
                {`${((action.end - action.start)/60).toFixed(0)} mins`}
            </MUI.Box>
            <MUI.Box className={'draggable-area-right'}>
                <MUI.Box className={'draggable-line'}></MUI.Box>
                <MUI.Box className={'draggable-line'}></MUI.Box>
            </MUI.Box>
        </MUI.Box>
    )
};

export default RangeSlider;