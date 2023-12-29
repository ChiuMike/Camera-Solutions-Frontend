import * as MUI from "@mui/material";
import { MutableRefObject, FC, useState, useEffect, useContext, useRef} from "react";
import * as L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { useMap } from "react-leaflet";
import { IMapDevice } from "../../../apis/geolocation";
import { MarkerIcon } from "../style/DeviceMap.styles";
import * as MuiIcons from "@mui/icons-material/";
import 'leaflet.markercluster';
import { CancelButton } from "../../../components/popup/Popup.styles";
import { DeviceMapContext, IDeviceMapState } from "../provider/DeviceMapProvider";
import { clusterIconLogic, videos } from "../helper/MapHelper";
 
interface MarkerBaseProps {
    mapDevices: IMapDevice[];
    previousViweRef: MutableRefObject<L.LatLngExpression | undefined>
    MarkerMountedRef: React.MutableRefObject<boolean>;
    previousZoomRef: MutableRefObject<number | undefined>;
    mapLoading: boolean;
}

export interface IMarkerDetail {
    position: string,
    name: string,
    videoUrl: string,
    time?: string;
}

const Marker: FC<MarkerBaseProps> = ({ mapDevices, previousZoomRef, previousViweRef, MarkerMountedRef, mapLoading }) => {

    const map = useMap();
    const { selectedIndex, filter, setSelectedIndex } = useContext(DeviceMapContext) as IDeviceMapState;
    const [detail, setDetail] = useState<IMarkerDetail>({time: '', position: '', name: '', videoUrl: ''});
    const [open, setOpen] = useState(false);
    const [markers, setMarkers] = useState<L.Marker<any>[]>([]);
    const [latlngArr, setLatlngArr] = useState<L.LatLngTuple[]>([]);

    const mcgRef = useRef<L.MarkerClusterGroup>(
        L.markerClusterGroup({
            iconCreateFunction: function (cluster: L.MarkerCluster) {
                const number = cluster.getChildCount();
                const icon = clusterIconLogic(number, 'cluster-red');
                return L.divIcon(
                    {
                        html: `<span>${cluster.getChildCount()}</span>`,
                        className: icon.className,
                        iconSize: icon.point,
                    }
                );
            },
            zoomToBoundsOnClick: false,
            spiderfyOnMaxZoom: true,
        })
    );
    
    const previousMarker = useRef<L.Marker<any>>();

    const showMarkerInfo = (latlng: string , name: string, videoUrl: string, update_time?: string, ) => {
        setDetail({time: update_time, position: latlng, name: name, videoUrl: videoUrl});
        setOpen(true);
    }

    useEffect(() => {

        if(mapDevices.length === 0) return;
        if(mapLoading) return;

        if(selectedIndex[0] !== -1) setSelectedIndex([-1]);
        if(previousMarker.current !== undefined) {
            map.removeLayer(previousMarker.current);
            previousMarker.current = undefined;
        };

        mcgRef.current.clearLayers();
        let latlngs: L.LatLngTuple[]=[];
        let markersArray: L.Marker<any>[] = [];
        
        mapDevices
        .filter((device) => {
            if(filter.state.length === 0) return device;
            return filter.state.includes(device.device.status);
        })
        .filter((device) => {
            if(filter.camera.length === 0) return device;
            return filter.camera.includes(device.device.name.split("_")[0].toLowerCase())
        })
        .forEach((item: IMapDevice, index) => {

            var marker_icon = null;

            if(item.geolocation[0] && item.geolocation[0].lat) {
                let lat = Number(item.geolocation[0].lat);
                let lng = Number(item.geolocation[0].lng);
                let wp = new L.LatLng(lat, lng);

                let corner: L.LatLngTuple = [lat, lng];
                latlngs.push(corner);

                marker_icon = L.divIcon({
                    className: "my-custom-pin",
                    html: ReactDOMServer.renderToString(
                        <MarkerIcon color="#00bcd4">
                            <MuiIcons.DirectionsWalk sx={{fontSize: '32px'}} />
                            <div className="triangle-people2"></div>
                            <div className="pulse-people"></div>
                        </MarkerIcon>
                           
                    ),
                    iconAnchor: new L.Point(15, 30)
                });

                var marker = L.marker(wp, {
                    icon: marker_icon,
                    draggable: false,
                })
                .addTo(mcgRef.current)
                .bindTooltip(`${item.device.name}`)
                .addEventListener('click', function(e) {
                    showMarkerInfo(`
                        ${lat.toFixed(3)}, ${lng.toFixed(3)}`, 
                        item.device.name, 
                        "/video/driving.mp4",
                        item.geolocation[0].update_time
                    );
                });

                markersArray.push(marker);
            }
        });

        setMarkers(markersArray);

        map.addLayer(mcgRef.current);

        map.addEventListener('moveend', function(e) {
            let newCenter: L.LatLng = map.getCenter()
            let newZoom = map.getZoom();
            previousViweRef.current = newCenter;
            previousZoomRef.current = newZoom;
        });

        mcgRef.current.on('clusterclick', function (a: L.LeafletEvent) {
            a.layer.zoomToBounds();
        });

        map.on('zoomend', function() {
            map.invalidateSize()
        });

        //reserve previous map view
        if(MarkerMountedRef.current === false && latlngs.length > 0) {
            map.fitBounds(latlngs);
            MarkerMountedRef.current = true;
            setLatlngArr(latlngs)
        }else if(MarkerMountedRef.current === true){
            if(previousViweRef.current) {
                map.setView(previousViweRef.current, previousZoomRef.current);
            }
        }

        return () =>{
            if(map.hasLayer(mcgRef.current)){
                map.removeLayer(mcgRef.current);
            }
        };

    }, [filter.camera, filter.state, mapDevices]);

    useEffect(() => {

        if(selectedIndex[0] !== -1 && mcgRef.current !== undefined) {

            mcgRef.current.eachLayer((layer) => {
                
                if ((layer as any)._latlng.lat === (markers[selectedIndex[0]] as any)._latlng.lat) {
                    mcgRef.current?.removeLayer(layer);
                }
                if (previousMarker.current !== undefined) {
                    if ((layer as any)._latlng.lat === (previousMarker.current as any)._latlng.lat) {
                        mcgRef.current?.removeLayer(layer);
                    }
                }
                
            })

            markers[selectedIndex[0]].setIcon(L.divIcon({
                className: "my-custom-pin",
                html: ReactDOMServer.renderToString(
                    <MarkerIcon color="#ff5722">
                        <MuiIcons.DirectionsWalk sx={{fontSize: '32px'}} />
                        <div className="triangle-people2"></div>
                        <div className="pulse-people"></div>
                    </MarkerIcon>
                       
                ),
                iconAnchor: new L.Point(15, 30)
            })).addTo(mcgRef.current);

            if(previousMarker.current !== undefined) {
                previousMarker.current?.setIcon(L.divIcon({
                    className: "my-custom-pin",
                    html: ReactDOMServer.renderToString(
                        <MarkerIcon color="#00bcd4">
                            <MuiIcons.DirectionsWalk sx={{fontSize: '32px'}} />
                            <div className="triangle-people2"></div>
                            <div className="pulse-people"></div>
                        </MarkerIcon>
                           
                    ),
                    iconAnchor: new L.Point(15, 30)
                })).addTo(mcgRef.current);
            }

            previousMarker.current = markers[selectedIndex[0]];

            map.setView(markers[selectedIndex[0]].getLatLng(),16)

        } else {
            if(latlngArr.length > 0 && mcgRef.current !== undefined) {

                mcgRef.current.eachLayer((layer) => {
                    if(previousMarker.current !== undefined) {
                        if ((layer as any)._latlng.lat === (previousMarker.current as any)._latlng.lat) {
                            mcgRef.current?.removeLayer(layer);
                        }
                    }
                });

                previousMarker.current?.setIcon(L.divIcon({
                    className: "my-custom-pin",
                    html: ReactDOMServer.renderToString(
                        <MarkerIcon color="#00bcd4">
                            <MuiIcons.DirectionsWalk sx={{fontSize: '32px'}} />
                            <div className="triangle-people2"></div>
                            <div className="pulse-people"></div>
                        </MarkerIcon>
                    ),
                    iconAnchor: new L.Point(15, 30)
                })).addTo(mcgRef.current);

                previousMarker.current = undefined;
                
                map.fitBounds(latlngArr);
            }
        }
        
    }, [selectedIndex[0]])

    return (
        <>
            <MUI.Dialog
                open={open}
                aria-labelledby="responsive-dialog-title"
                maxWidth={"lg"}
            >   
                <video muted={true} autoPlay loop>
                    <source 
                        src ={`${detail.videoUrl}` }
                        type="video/mp4"
                    />
                </video>
                <MUI.DialogContent sx={{background: '#000' }}>
                    <MUI.Typography component="h1" variant="h5" sx={{color: "#FFF", fontWeight: 'bold', mb: 1}}>
				       {detail.name}
			        </MUI.Typography>
                    
                    <MUI.Stack direction={"row"} gap={0} justifyContent={"space-between"} alignItems={"center"}>
                        <MUI.Stack direction={"row"} gap={1}>
                            <MuiIcons.MyLocation sx={{color: "#FFF"}} />
                            <MUI.Typography component="h1" variant="subtitle2" sx={{color: "#FFF", lineHeight: 1.618,}}>
                                {detail.position}
                            </MUI.Typography>
                            <MuiIcons.AccessTimeFilled sx={{color: "#FFF", ml: 1}} />
                            <MUI.Typography component="h1" variant="subtitle2" sx={{color: "#FFF", lineHeight: 1.618,}}>
                                {detail.time}
                            </MUI.Typography>
                        </MUI.Stack>
                        <CancelButton onClick={() => setOpen(false)} sx={{margin: 0}}>Close</CancelButton>
                    </MUI.Stack> 
                </MUI.DialogContent>
            </MUI.Dialog>
        </>
    )
};

export default Marker;