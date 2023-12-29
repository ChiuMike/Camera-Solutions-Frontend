import * as MUI from "@mui/material";
import { MutableRefObject, useEffect, useRef, FC, useState } from "react";
import "leaflet/dist/leaflet.css";
import * as L from 'leaflet'
import ReactDOMServer from 'react-dom/server';
import { useMap } from "react-leaflet";
import { ChannelDevice } from "../../../../apis/channel/type";
import { useClientChannelsState } from "../../context/ClientStateProvider";
import { clusterIconLogic } from "../../../gps/helper/MapHelper";
import { DynamicIcon } from "../../../../components/marker";

interface ChannelMarkerBaseProps {
    channelDevices: ChannelDevice[];
    clusterColor: string;
    previousViweRef: MutableRefObject<L.LatLngExpression | undefined>
    previousZoomRef: MutableRefObject<number | undefined>;
};

export interface Detail {
    position: string,
    name: string,
    time?: string;
};

const markerColor = [
    '#c24242', '#6d4c41', '#02759F', '#00bcd4', '#0090a2', '#ff5252', '#f44336',
    '#9c27b0', '#ffeb3b', '#009688', '#ff5722', '#3f51b5', '#212121', 
];


const ChannelMarker: FC<ChannelMarkerBaseProps> = ({channelDevices, previousZoomRef, previousViweRef}) => {

    const map = useMap();
    const { selectedChannel } = useClientChannelsState();

    const [detail, setDetail] = useState<Detail>({time: '', position: '', name: ''});
    const [open, setOpen] = useState(false);

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');
    const mapDevicesLength = useRef(0);

    const mcgRef = useRef<L.MarkerClusterGroup>(L.markerClusterGroup({
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
    }));

    const showMarkerInfo = (latlng: string , name: string, update_time?: string) => {
        setDetail({time: update_time, position: latlng, name: name});
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };
    
    useEffect(()=> {
        if(channelDevices.length === 0) {
            if(map.hasLayer(mcgRef.current)) {
                map.removeLayer(mcgRef.current);
            }
            map.setView([20, 0], 2);
            if(previousViweRef.current !== undefined) previousViweRef.current = undefined;
            return;
        };

        if(map.hasLayer(mcgRef.current)) {
            map.removeLayer(mcgRef.current);
        }

        mcgRef.current.clearLayers();
        let latlngArr: L.LatLngTuple[]=[];
        
        channelDevices.forEach((item: ChannelDevice, index) => {
            var marker_icon = null;

            let lat = Number(item.lat);
            let lng = Number(item.lng);
            let wp = new L.LatLng(lat, lng);

            let corner:L.LatLngTuple = [lat, lng];
            latlngArr.push(corner);
            marker_icon = L.divIcon({
                className: "my-custom-pin end-icon",
                html: ReactDOMServer.renderToString(
                    <DynamicIcon color={markerColor[index]}>
                        <div>
                        </div>
                    </DynamicIcon>
                ),
                iconAnchor: new L.Point(15, 30)
            });

            L.marker(wp, {
                icon: marker_icon,
                draggable: false,
            })
            .addTo(mcgRef.current)
            .bindTooltip(`${channelDevices[index].name}`)
            .addEventListener('click', function(e) {
                showMarkerInfo(`${lat.toFixed(3)}, ${lng.toFixed(3)}`, channelDevices[index].name, channelDevices[index].update_time);
            });
            
        });

        map.addLayer(mcgRef.current);
        map.addEventListener('moveend', function(e) {
            let newCenter: L.LatLng = map.getCenter()
            let newZoom = map.getZoom();
            previousViweRef.current = newCenter;
            previousZoomRef.current = newZoom;
        })
        mcgRef.current.on('clusterclick', function (a: L.LeafletEvent) {
            a.layer.zoomToBounds();
        });
        map.on('zoomend', function() {
            map.invalidateSize()
        });

        if(mapDevicesLength.current !== channelDevices.length && latlngArr.length > 0) {
            map.fitBounds(latlngArr);
            mapDevicesLength.current = channelDevices.length;
        } else {
            if(previousViweRef.current) {
                map.setView(previousViweRef.current, previousZoomRef.current);
            }
        }
        
        return () =>{
            if(map.hasLayer(mcgRef.current)){
                map.removeLayer(mcgRef.current);
                mapDevicesLength.current = 0;
            }
        };
    }, [channelDevices]);

    useEffect(() => {
        if(selectedChannel.channelId === "" ) {
            if(map.hasLayer(mcgRef.current)) {
                map.removeLayer(mcgRef.current);
            }
            map.setView([20, 0], 2);
            mapDevicesLength.current = 0;
            if(previousViweRef.current !== undefined) previousViweRef.current = undefined;
        }
    }, [selectedChannel.channelId]);

    return (
        <MUI.Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            maxWidth={"sm"}
            fullWidth={true}
        > 
            <MUI.DialogTitle id="responsive-dialog-title">
                {detail.name}
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
    )
};

export default ChannelMarker;