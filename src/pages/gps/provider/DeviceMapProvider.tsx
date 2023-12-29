import React, { useState } from 'react';
import { IPosition } from '../../../apis/geolocation/type';
import useClick from '../../../hooks/useClick';

export type IDeviceMapState = {
    selectedIndex: number[];
    setSelectedIndex: React.Dispatch<React.SetStateAction<number[]>>;
    selectedPos: IPosition;
    setSelectedPos: React.Dispatch<React.SetStateAction<IPosition>>;
    subDrawerOpen: boolean;
    filter: IDeviceFilter;
    setFilter: React.Dispatch<React.SetStateAction<IDeviceFilter>>;
}

export interface IDeviceFilter {
    state: string[];
    camera: string[];
}

type IProviderProps = {children: React.ReactNode;}

export const DeviceMapContext = React.createContext<IDeviceMapState | null>(null);

const DeviceMapProvider: React.FC<IProviderProps> = ({children}) => {

    const [selectedIndex, setSelectedIndex] = React.useState<number[]>([-1]);

    const [selectedPos, setSelectedPos] = useState<IPosition>({
        lat: '',
        lng: '',
        update_time: '',
    });

    const [filter, setFilter] = useState<IDeviceFilter>({
        state: [],
        camera: []
    });

    const [handleSubDrawer, subDrawerOpen, setSubDrawerOpen] = useClick();

    return (
        <DeviceMapContext.Provider
            value={{
                selectedIndex, 
                setSelectedIndex, 
                selectedPos, 
                setSelectedPos,
                subDrawerOpen,
                filter, 
                setFilter
            }}
        >
            {children}
        </DeviceMapContext.Provider>
    )

}

export default DeviceMapProvider;