import { useEffect, FC, useCallback, useState,}  from "react";
import { MapContainer,TileLayer } from 'react-leaflet';
import PatrolDrawer from "./PatrolDrawer";
import * as MUI from "@mui/material";
import useClick from "../../hooks/useClick";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "./style/patrolMap.css"
import { useAxios } from "../../hooks/useAxios";
import { ReadAllPatrolsResponse, ApiUrl, GetPatrolResponse } from "../../apis/patrol";
import { RequestMethod } from "../../apis/Api";
import PatrolRoute from "./PatrolRoute";
import PatrolInfo from "./PatrolInfo";
import { Container } from "./style/Patrol.styles";

interface PatrolBaseProps {
    drawerOpen: boolean;
};

const Patrol: FC<PatrolBaseProps> = ({drawerOpen : navDrawerOpen}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:575px)');

    const [handleOpen, open, setOpen] = useClick();

    const [selectedPatrol, setSelectedPatrol] = useState<string>("");

    const [checked, setChecked] = useState(false);

    const [completed, setCompleted] = useState(false);

    const {loading, data: patrols, makeRequest: readAllPatrols } = useAxios<ReadAllPatrolsResponse>();

    const {data: patrolGPS, makeRequest: getPatrolGPS } = useAxios<GetPatrolResponse>();

    const handleSubDrawerChange = useCallback(() => {
        if (navDrawerOpen && mediaMatches) {
            setOpen(false);
        }
    }, [navDrawerOpen, mediaMatches]);

    useEffect(() => {
        readAllPatrols({
            url: ApiUrl.readAllPatrols(),
            method: RequestMethod.GET,
        })
    }, []);

    useEffect(() => {
        if(selectedPatrol === '') return;
        getPatrolGPS({
            url: ApiUrl.getPatrolGPS(selectedPatrol),
            method: RequestMethod.GET
        })
    }, [selectedPatrol]);

    useEffect(() => {
        handleSubDrawerChange();
    } ,[handleSubDrawerChange]);

    return (
        <>
        <PatrolDrawer 
            open={open} 
            navDrawerOpen={navDrawerOpen}
            patrols={patrols ? patrols.data : []}
            selectedPatrol={selectedPatrol}
            setSelectedPatrol={setSelectedPatrol}
            setChecked={setChecked}
        />
        <Container open={navDrawerOpen}>
            <MapContainer
                className="patrol-map"
                zoom={2}
                center={[10, 0]}
                style={{height:'100%',}}
                zoomControl={false}
            >   
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {patrols !== undefined && 
                    <PatrolInfo 
                        patrolData={patrols.data[0]} 
                        checked={checked}
                        completed={completed}
                    />
                }
                <PatrolRoute 
                    patrolGPS={patrolGPS ? patrolGPS.data : []}
                    setCompleted={setCompleted}
                />
            </MapContainer>
        </Container>
        </>
    )
};

export default Patrol;