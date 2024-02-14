import { useEffect, FC, useRef, useState, useCallback, Dispatch, SetStateAction } from "react";
import * as MuiIcons from "@mui/icons-material/";
import * as MUI from "@mui/material";
import * as L from 'leaflet';
import { useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { HistoryIcon, PatrolIcon } from "../gps/style/DeviceMap.styles";
import "l.movemarker";
import { IPatrolGPSDto } from "../../apis/patrol";

interface PatrolRouteBaseProps {
    patrolGPS: IPatrolGPSDto[];
    setCompleted: Dispatch<SetStateAction<boolean>>;
}

const PatrolRoute: FC<PatrolRouteBaseProps> = ({patrolGPS, setCompleted}) => {

    const map = useMap();
    const instanceRef = useRef<any>(null);
    const checkingTimeRef = useRef<NodeJS.Timeout>();
    const addMoreLineTimeRef = useRef<NodeJS.Timeout>();
    const doneTimeRef = useRef<NodeJS.Timeout>();
    
    const [start, setStart] = useState(false);
    const [previousMarker, setPreviousMarker] = useState<L.Marker>();
    const [count, setCount] = useState(2);

    const handleStart = useCallback(() => {

        map.setView([Number(patrolGPS[0].lat), Number(patrolGPS[0].lng)], 16, { animate: true });

        instanceRef.current.addTo(map);

        setPreviousMarker(
            instanceRef.current?.getMarker()
        );

    }, [start]);

    const addMoreLine = useCallback(() => {

        checkingTimeRef.current = setTimeout(() => {

            let marker_icon = L.divIcon({
                className: "my-custom-pin",
                html: ReactDOMServer.renderToString(
                    <HistoryIcon sx={{backgroundColor: 'rgb(237, 108, 2)'}}>
                        <MUI.Typography>{count-1}</MUI.Typography>
                    </HistoryIcon>
                ),
                iconAnchor: new L.Point(15, 30)
            });
    
            let marker = L.marker(
                new L.LatLng(
                    (previousMarker as any)?._nextLatLng[0], 
                    (previousMarker as any)?._nextLatLng[1]
                ), 
                {
                    title:`marker`,
                    icon: marker_icon,
                    draggable: false,
                }
            ).addTo(map).bindTooltip("Checking...").openTooltip();

            addMoreLineTimeRef.current = setTimeout(() => {
                marker.setIcon(
                    L.divIcon({
                        className: "my-custom-pin",
                        html: ReactDOMServer.renderToString(
                            <HistoryIcon sx={{backgroundColor: '#8bc34a'}}>
                                <MUI.Typography>{count-1}</MUI.Typography>
                            </HistoryIcon>
                        ),
                        iconAnchor: new L.Point(15, 30)
                    })
                ).setTooltipContent("Check Point").closeTooltip();
                
                try {
                    instanceRef.current.addMoreLine(
                        [Number(patrolGPS[count].lat), Number(patrolGPS[count].lng)],
                        {
                            rotateAngle: 0,
                            animatePolyline: true,
                            duration: 5000,
                        }
                    );
                    setCount((prev) => prev+=1);
                } catch(e) {
                    console.log("e...", e);
                }    
                
            } ,5000)
    
        } , 6000)

    } ,[previousMarker?.getLatLng().lat]);

    const handleMoveStep = useCallback(() => {

        setPreviousMarker(
            instanceRef.current?.getMarker()
        );

    }, [count]);

    useEffect(() => {
        if(patrolGPS.length === 0) return;

        instanceRef.current = (L as any).moveMarker(
            [
                [Number(patrolGPS[0].lat), Number(patrolGPS[0].lng)],
                [Number(patrolGPS[1].lat), Number(patrolGPS[1].lng)]
            ],
            {
                animate: true,
                color: '#243B70',
                weight: 4,
                hidePolylines: false,
                duration: 5000,
                removeFirstLines: false,
                maxLengthLines: 3
            },
            {
                animate: true,
                hideMarker: false,
                duration: 5000,
                speed: 0,
                followMarker: true,
                rotateMarker: true,
                rotateAngle: 0,
                icon: L.divIcon({
                    className: "my-custom-pin",
                    html: ReactDOMServer.renderToString(
                        <PatrolIcon color="#00bcd4">
                            <MuiIcons.DirectionsWalk sx={{fontSize: '24px'}} />
                            <div className="triangle-people2"></div>
                            <div className="pulse-people"></div>
                        </PatrolIcon>
                            
                    ),
                    iconAnchor: new L.Point(15, 30)
                })
            },
            {}
        );
        
        if(instanceRef.current !== null) {
            setStart(true);
        };

    }, [patrolGPS.length]);

    useEffect(() => {

        if(instanceRef.current === null) return;
        if(!start) return;

        handleStart();

        return () => {
            map.removeLayer(instanceRef.current);
            setPreviousMarker(undefined);
        }

    }, [handleStart]);

    useEffect(() => {
        if(previousMarker === undefined) return;
        if(instanceRef.current === null) return;
        if(count >= 5) return;

        addMoreLine();

        return () => {
            clearTimeout(checkingTimeRef.current);
            clearTimeout(addMoreLineTimeRef.current);
        };        

    }, [addMoreLine])

    useEffect(() => {
        if(instanceRef.current === null) return;

        if(count >= 5) {
            doneTimeRef.current = setTimeout(() => {
                instanceRef.current?.getMarker().setIcon(
                    L.divIcon({
                        className: "my-custom-pin",
                        html: ReactDOMServer.renderToString(
                            <PatrolIcon color="#00bcd4">
                                <MuiIcons.CheckCircle sx={{fontSize: '24px'}} />
                                <div className="triangle-people2"></div>
                                <div className="pulse-people"></div>
                            </PatrolIcon>
                                
                        ),
                        iconAnchor: new L.Point(15, 30)
                    })
                ).bindTooltip("Completed").openTooltip();
                setCompleted(true);
            } ,6000)
        }

        handleMoveStep();

        return () => clearTimeout(doneTimeRef.current)
        
    } ,[handleMoveStep]);

    return (
        <>
        </>
    )

};

export default PatrolRoute;