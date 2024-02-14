import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { FC, useState, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import * as MuiIcons from "@mui/icons-material/";
import { IPatrolGPSDto } from "../../apis/patrol";
import { PatrolMarkerIcon } from "../../components/marker/Marker.styles";

interface RouteBaseProps {
    patrolGPS: IPatrolGPSDto[];
    checked: boolean;
    selectedPatrol: string;
}

const Route: FC<RouteBaseProps> = ({patrolGPS, checked, selectedPatrol}) => {

    const map = useMap();

    const myRoute = L.Routing.osrmv1({
        serviceUrl: 'http://52.90.227.149:5000/route/v1',
        timeout: 5000,
        profile: 'driving',
    });

    const [routeLine, setRouteLine] = useState<L.Routing.Control>();
    const [marker, setMarker] = useState<L.Marker<any>>();

    useEffect(() => {
        if (!map) return;
        if(patrolGPS.length < 1) return;
        if(selectedPatrol === "") return;
        if(routeLine !== undefined) {
            map.removeControl(routeLine);
            setRouteLine(undefined);
        };

        let routePoints: L.LatLng[] = [];
        let markers: L.Marker<any>[] = [];

        patrolGPS.forEach((location, index) => {
            if(location.lat === undefined) return;

            let lat = Number(location.lat);
            let lng = Number(location.lng);
            let wayPoint = new L.LatLng(lat , lng);

            routePoints.push(wayPoint);
        });

        if(routePoints.length > 0) {

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
                        });

                        markers.push(marker);
                        return marker;
                    },
                }),
                router: myRoute,
                routeLine: function(route: L.Routing.IRoute) {
                    let line = L.Routing.line(route, {
                        styles: [{color: "#0077C0", opacity: 0.85, weight: 7, className:'patrol-line'}],
                        extendToWaypoints: true,
                        missingRouteTolerance: 0,
                        addWaypoints: false,
                    });
                    line.eachLayer(function(l) {
                        l.on('mouseover', function(e: any) {
                            e.target.setStyle({
                                color: "#0077C0", 
                                fill: true,
                            });
                            e.target.bindTooltip(`Total distance:  ${route.summary?.totalDistance} m`);
                        });
                        l.on('mouseout', function(e) {
                            e.target.setStyle({
                                color: "#0077C0", 
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

            setRouteLine(routingControl);

        } else {
            setRouteLine(undefined);
        };

        map.on('zoomend', function() {
            map.invalidateSize()
        });

        let markIcon = L.divIcon({
            className: "my-custom-pin",
            html: ReactDOMServer.renderToString(
                <PatrolMarkerIcon color="#0077C0">
                    <MuiIcons.NearMe />
                </PatrolMarkerIcon>
            ),
            iconAnchor: new L.Point(14, 15)
        });

        let marker = L.marker(routePoints[routePoints.length-1], {
            icon: markIcon,
            draggable: false,
        }).addTo(map);

        setMarker(marker);

        map.setView(routePoints[routePoints.length-1], 16);

        return () => {
            if(routeLine) {
                map.removeControl(routeLine);
                setRouteLine(undefined);
            };
            if(map.hasLayer(marker)){ 
                map.removeLayer(marker);
            }
        }

    }, [patrolGPS.length, selectedPatrol]);

    useEffect(() => {
        if(checked) return;
        if(!marker) return;

        if(routeLine !== undefined) {
            map.removeControl(routeLine);
            setRouteLine(undefined);
        };

        if(map.hasLayer(marker)){ 
            map.removeLayer(marker);
        }

    }, [checked])


    return (
        <>
        </>
    )
};

export default Route;