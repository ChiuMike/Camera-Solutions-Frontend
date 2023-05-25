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
    "/video/driving.mp4",
    "/video/night-car.mp4",
    "/video/girl-run.mp4"
]
