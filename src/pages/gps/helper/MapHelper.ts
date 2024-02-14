import L, { MarkerCluster } from "leaflet";

export const markerColor = [
    '#c24242', '#6d4c41', '#02759F', '#00bcd4', '#0090a2', '#ff5252', '#f44336',
    '#9c27b0', '#ffeb3b', '#009688', '#ff5722', '#3f51b5', '#212121', 
];


export const clusterIconLogic = (number: number, clusterColor: string) => {
    let className = "marker-cluster-custom " + clusterColor;
    let point;

    if(number <= 4) {
        point = L.point(30, 30);
    }else if (number <= 24) {
        point = L.point(30, 30);
    }else if (number <= 60) {
        point = L.point(45, 45);
    }else {
        point = L.point(30, 30);
    }

    return { className: className, point: point}
}

export const videos = [
    "/video/bike.mp4",
    "/video/bike2.mp4",
    "/video/bus_stop.mp4",
    "/video/cross_road.mp4",
    "/video/driving-on-road.mp4",
    "/video/driving.mp4",
    "/video/girl-run.mp4",
    "/video/hightway.mp4",
    "/video/rural.mp4",
    "/video/rura2.mp4",
]
