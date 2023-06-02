import React, { useState } from 'react';
import { IPosition } from '../../../apis/geolocation/type';

export type IDeviceMapState = {
    selectedIndex: number[];
    setSelectedIndex: React.Dispatch<React.SetStateAction<number[]>>;
    selectedPos: IPosition;
    setSelectedPos: React.Dispatch<React.SetStateAction<IPosition>>;
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

    return (
        <DeviceMapContext.Provider
            value={{
                selectedIndex, setSelectedIndex, selectedPos, setSelectedPos
            }}
        >
            {children}
        </DeviceMapContext.Provider>
    )

}

export default DeviceMapProvider;