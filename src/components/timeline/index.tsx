import RangeSlider from "./RangeSlider";
import TimelineScale from "./TimelineScale";
import { TimelineRow, TimelineEffect } from '@xzdarcy/react-timeline-editor';

export { 
    RangeSlider,
    TimelineScale,
}

export const mockData: TimelineRow[] = [
    {
        id: "0",
        actions: [],
    },
]

export const mockEffect: Record<string, TimelineEffect> = {
    effect0: {
      id: "effect0",
      name: "效果0",
    },
};