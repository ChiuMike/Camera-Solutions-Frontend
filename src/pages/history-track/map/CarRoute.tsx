import * as MUI from "@mui/material";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { FC, useRef, useState, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import moment from "moment";
import * as MuiIcons from "@mui/icons-material/";
import "../../../helper/moving_marker";
import { IHistoryPosition } from "../../../apis/geolocation";
import { ABMarkerIcon, HistoryIcon } from "../../../components/marker";
import { TimePeriod } from "../../../types/web";

interface CarRouteProps {
    position: IHistoryPosition[];
    timePeriod: TimePeriod;
    selectedIndex: number;
    viewRoute: boolean;
    viewMarkers: boolean;
    play: boolean;
    handleDisabled: () => void;
    disabled: boolean;
}

const CarRoute: FC<CarRouteProps> = ({position, timePeriod, selectedIndex, viewRoute, viewMarkers, play, handleDisabled, disabled}) => {
    
    const map = useMap();
    const previousSelectedMarker = useRef<L.Marker<any>>();
    const playRef = useRef<any>();

    const myRoute = L.Routing.osrmv1({
        serviceUrl: 'http://localhost:5001/route/v1',
        timeout: 5000,
        profile: 'driving',
    });

    const [routeLine, setRouteLine] = useState<L.Routing.Control>();
    const [markersOnMap, setMarkersOnMap] = useState<L.Marker<any>[]>([]);
    const [ABmarkers, setABmarkers] = useState<L.Marker<any>[]>([]);
    const [wayPoints, setWayPoints] = useState<L.LatLng[]>([]);
    const [routesLine, setRoutesLine] = useState<L.LatLng[]>([]);

    useEffect(() => {
        if (!map) return;
        if(position.length === 0) return;
        if(routeLine !== undefined) {
            map.removeControl(routeLine);
            setRouteLine(undefined);
        };
        
        let routePoints: L.LatLng[] = [];
        let mapFitBounds: L.LatLngTuple[] = [];
        let markers: L.Marker<any>[] = [];

        position.filter((location: IHistoryPosition, index) => {
            if(timePeriod.actionStart === "" && timePeriod.actionEnd === "") {
                return location
            }
            let format = 'hh:mm';
            let start = moment(timePeriod.actionStart, format);
            let end = moment(timePeriod.actionEnd, format);

            let startFlag = moment(location.update_time, format).isSame(start);
            let endFlag = moment(location.update_time, format).isSame(end);
            let isBetween = moment(location.update_time, format)
                            .isBetween(moment(timePeriod.actionStart, format), moment(timePeriod.actionEnd, format));

            return startFlag || endFlag || isBetween;
        })
        .forEach((location: IHistoryPosition, index) => {
            if(location.lat === undefined) return;
            
            let lat = Number(location.lat);
            let lng = Number(location.lng);
            let wayPoint = new L.LatLng(lat , lng);

            routePoints.push(wayPoint);
        });

        if(routePoints.length > 0 && routePoints.length !== 1) {

            mapFitBounds.push([Number(routePoints[0].lat), Number(routePoints[0].lng)])
            mapFitBounds.push([Number(routePoints[routePoints.length -1].lat), Number(routePoints[routePoints.length -1].lng)]);

            let routingControl = L.Routing.control({  
                waypoints: routePoints,
                plan: L.Routing.plan(routePoints,{
                    createMarker: function(i: number, wp: L.Routing.Waypoint, n: number) {
                        let marker_icon = null;
                        marker_icon = L.divIcon({
                            className: "my-custom-pin",
                            html: ReactDOMServer.renderToString(
                                <></>
                            ),
                            iconAnchor: new L.Point(0, 0)
                        })
                        let marker = L.marker(wp.latLng, {
                            title:`marker-${i}`,
                            icon: marker_icon,
                            draggable: false,
                        })
                        .bindTooltip(`${position[i].update_time}`)
                        
                        markers.push(marker);
                        return marker;
                    },
                }),
                router: myRoute,
                routeLine: function(route: L.Routing.IRoute) {
                    let line = L.Routing.line(route, {
                        styles: [{color: "#243B70", opacity: 0.7, weight: 7, className:'custom-line'}],
                        extendToWaypoints: true,
                        missingRouteTolerance: 0,
                        addWaypoints: false,
                    });
                    line.eachLayer(function(l) {
                        l.on('mouseover', function(e: any) {
                            e.target.setStyle({
                                color: "#243B70", 
                                fill: true,
                            });
                            e.target.bindTooltip(`Total distance:  ${route.summary?.totalDistance} m`);
                        });
                        l.on('mouseout', function(e) {
                            e.target.setStyle({
                                color: "#243B70", 
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
                setRoutesLine(e.routes[0].coordinates)
            });

            setRouteLine(routingControl);

            if(disabled) handleDisabled();

        }  else {
            setRouteLine(undefined);
            handleDisabled();
        }

        map.on('zoomend', function() {
            map.invalidateSize()
        });

        if(mapFitBounds.length > 0) 
            map.fitBounds(mapFitBounds, {maxZoom: 17});
            setWayPoints(routePoints);

        return () => {
            if(routeLine) {
                map.removeControl(routeLine);
                setRouteLine(undefined);
            }
        }

    }, [timePeriod.actionEnd, timePeriod.actionStart, position]);

    useEffect(() => {
        if(wayPoints.length === 0 || !viewRoute) {
            ABmarkers.forEach(marker => {
                if(map.hasLayer(marker)) {
                    map.removeLayer(marker);
                }
            });
            setABmarkers([]);
            return;
        };
        if(ABmarkers.length > 0) {
            ABmarkers.forEach(marker => {
                if(map.hasLayer(marker)) {
                    map.removeLayer(marker);
                }
            });
            setABmarkers([]);
        }

        let markers: L.Marker<any>[] = [];

        let startIcon = L.divIcon({
            className: "my-custom-pin",
            html: ReactDOMServer.renderToString(
                <ABMarkerIcon color="#27ae60">
                    <MUI.Typography>A</MUI.Typography>
                </ABMarkerIcon>
            ),
            iconAnchor: new L.Point(14, 15)
        });

        let endIcon = L.divIcon({
            className: "my-custom-pin",
            html: ReactDOMServer.renderToString(
                <ABMarkerIcon color="#f46a05">
                    <MUI.Typography>B</MUI.Typography>
                </ABMarkerIcon>
            ),
        });

        if(wayPoints.length === 1) {
            let start = L.marker(wayPoints[0], {
                icon: startIcon,
                draggable: false,
            })
            .bindTooltip(`${wayPoints[0].lat}, ${wayPoints[0].lng}`)
            .addTo(map);

            markers.push(start);
            setABmarkers([start]);
        } else {
            let end = L.marker(wayPoints[wayPoints.length-1], {
                icon: endIcon,
                draggable: false,
            })
            .bindTooltip(`${wayPoints[wayPoints.length-1].lat}, ${wayPoints[wayPoints.length-1].lng}`)
            .addTo(map);
    
            let start = L.marker(wayPoints[0], {
                icon: startIcon,
                draggable: false,
            })
            .bindTooltip(`${wayPoints[0].lat}, ${wayPoints[0].lng}`)
            .addTo(map);
            
            markers.push(start)
            markers.push(end);
    
            setABmarkers([start, end]);
        }

    }, [viewRoute, wayPoints]);

    useEffect(() => {
        if(wayPoints.length === 0 || !viewMarkers) {
            markersOnMap.forEach(marker => {
                if(map.hasLayer(marker)) {
                    map.removeLayer(marker);
                }
            });
            setMarkersOnMap([]);
            return;
        }
        if(markersOnMap.length > 0) {
            markersOnMap.forEach(marker => {
                if(map.hasLayer(marker)) {
                    map.removeLayer(marker);
                }
            });
            setMarkersOnMap([]);
        }

        let markers: L.Marker<any>[] = [];

        wayPoints.forEach((point, index) => {
            let marker_icon = null;
            if(index === 0 || index === wayPoints.length - 1) return;

            marker_icon = L.divIcon({
                className: "my-custom-pin",
                html: ReactDOMServer.renderToString(
                    <HistoryIcon color="">
                    </HistoryIcon>                 
                ),
            });

            let marker = L.marker(point, {
                icon: marker_icon,
                draggable: false,
            }).addTo(map)
            

            markers.push(marker);
        });

        setMarkersOnMap(markers);

    }, [viewMarkers, wayPoints]);

    useEffect(() => {
        if(wayPoints.length === 1 || wayPoints.length === 0 || !play) {
            if(playRef.current && map.hasLayer(playRef.current)){
                map.removeLayer(playRef.current);
            };
            return;
        }
        if(routeLine === undefined) return;

        if(playRef.current && map.hasLayer(playRef.current)) map.removeLayer(playRef.current);

        playRef.current = (L.Marker as any).movingMarker(routesLine, 10000, {
            autostart: false,
            loop: true,
            icon: L.divIcon({
                className: "my-custom-pin",
                html: ReactDOMServer.renderToString(
                    <ABMarkerIcon color="#02759F" sx={{opacity: 1}}>
                        <MuiIcons.DirectionsCar />
                        <div className="pulse-people"></div>
                    </ABMarkerIcon>  
                ),
            })
        });

        map.addLayer(playRef.current);
        playRef.current.start();

    }, [play, wayPoints]);

    useEffect(() => {
        let marker_icon = null;
        if(selectedIndex !== -1) {
            if(previousSelectedMarker.current && map.hasLayer(previousSelectedMarker.current)) {
                map.removeLayer(previousSelectedMarker.current);
                previousSelectedMarker.current = undefined;
            }

            marker_icon = L.divIcon({
                className: "my-custom-pin",
                html: ReactDOMServer.renderToString(
                    <HistoryIcon 
                        color=""
                        sx={{width: '12px', height: '12px',}}
                    />           
                ),
            });

            let marker = L.marker(wayPoints[selectedIndex], {
                icon: marker_icon,
                draggable: false,
            })
            
            map.addLayer(marker);

            previousSelectedMarker.current = marker;

        } else {
            if(previousSelectedMarker.current && map.hasLayer(previousSelectedMarker.current)) {
                map.removeLayer(previousSelectedMarker.current);
            }
        }
    }, [selectedIndex]);

    useEffect(() => {
        if(position.length > 0) return;

        if(routeLine !== undefined){
            map.removeControl(routeLine);
            setRouteLine(undefined);
        }

        if(previousSelectedMarker.current && map.hasLayer(previousSelectedMarker.current)) {
            map.removeLayer(previousSelectedMarker.current);
        }

        map.setView([20,0], 2);
    } ,[position.length])


    return (
        <>
        </>
    )

};

export default CarRoute;