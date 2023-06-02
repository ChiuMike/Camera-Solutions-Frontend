import * as MUI from "@mui/material";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import ReactDOMServer from 'react-dom/server';
import 'leaflet.markercluster';
import { IPosition } from "../../../apis/geolocation";
import { HistoryIcon } from "../../gps/style/DeviceMap.styles";

interface HistoryRoutineBaseProps {
    device_name: string;
    position: IPosition[];
    setTotalDistance: Dispatch<SetStateAction<string>>;
}

interface Detail {
    position: string
    time: string;
}

const HistoryRoutine: FC<HistoryRoutineBaseProps> = ({device_name, position, setTotalDistance}) => {

    const map = useMap();
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState<Detail>({time: '', position: ''});

    const handleClickOpen = (street: string, update_time: string, ) => {
        setOpen(true);
        setDetail({time: update_time, position: street.replaceAll('undefined','').replaceAll(' ','')});
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=> {

        if (!map) return;

        let wayPoints: L.LatLng[] = [];
        let latlngs: L.LatLngTuple[]=[];

        position.forEach((location: IPosition) => {
            if(location.lat) {
                var wayPoint = new L.LatLng(Number(location.lat), Number(location.lng));
                latlngs.push([Number(location.lat), Number(location.lng)])
                wayPoints.push(wayPoint);
            } 
        })
       
        let lineColor = '#243B70';
        let markersArr: L.Marker[] = [];

        let myRoute = L.Routing.osrmv1({
            serviceUrl: 'http://localhost:5001/route/v1',
            timeout: 5000,
            profile: 'driving',
        });

        const routingControl = L.Routing.control({  
            waypoints: wayPoints,
            plan: L.Routing.plan(wayPoints,{
                createMarker: function(i: number, wp: L.Routing.Waypoint, n: number) {
                    let marker_icon = null;

                    marker_icon = L.divIcon({
                        className: "my-custom-pin",
                        html: ReactDOMServer.renderToString(
                            <HistoryIcon>
                                <MUI.Typography>{i+1}</MUI.Typography>
                            </HistoryIcon>
                        ),
                        iconAnchor: new L.Point(15, 30)
                    })

                    let marker = L.marker(wp.latLng, {
                        title:`marker-${i}`,
                        icon: marker_icon,
                        draggable: false,
                    })
                    .bindTooltip(`${device_name}`)
                    .addEventListener('click', function(e: L.LeafletEvent) {
                        handleClickOpen(`${wp.latLng.lat.toFixed(3)}, ${wp.latLng.lng.toFixed(3)}`, position[i].update_time);
                    });

                    markersArr.push(marker);

                    return marker;
                },
            }),
            router: myRoute,
            routeLine: function(route: L.Routing.IRoute) {
                let line = L.Routing.line(route, {
                    styles: [{color: lineColor, opacity: 0.7, weight: 7, className:'custom-line'}],
                    extendToWaypoints: true,
                    missingRouteTolerance: 0,
                    addWaypoints: false,
                });
                line.eachLayer(function(l) {
                    l.on('mouseover', function(e: any) {
                        e.target.setStyle({
                            color: lineColor, 
                            fill: true,
                        });
                        e.target.bindTooltip(`Total distance:  ${route.summary?.totalDistance} m`);
                    });
                    l.on('mouseout', function(e) {
                        e.target.setStyle({
                            color: lineColor, 
                            fill: false
                        });
                    });
                });
                return line;
            },
            show: false,
            addWaypoints: false,
            routeWhileDragging: false,
            fitSelectedRoutes: false,
            showAlternatives: false,
        }).addTo(map);

        routingControl.on('routesfound', function (e) {
            if(e?.routes && e.routes[0]?.summary) {
                setTotalDistance(e.routes[0].summary.totalDistance)
            }
        });

        let options = {
            maxZoom: 13
        }

        if (latlngs.length > 0) {
            map.fitBounds(latlngs, options);
        }
       
        return () => {
            routingControl.getPlan().setWaypoints([]);
            map.removeControl(routingControl);
        };

    }, [position]);

    return (
        <>
        <MUI.Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            maxWidth={"sm"}
            fullWidth={true}
        >
            <MUI.DialogTitle id="responsive-dialog-title">
                Device name: {device_name}
            </MUI.DialogTitle>
            <MUI.DialogContent>
                <MUI.DialogContentText>
                    Update time: {detail.time}
                </MUI.DialogContentText>
                <MUI.DialogContentText>
                    Position: {detail.position}
                </MUI.DialogContentText>
            </MUI.DialogContent>
        </MUI.Dialog>
        </>
    )
};

export default HistoryRoutine;