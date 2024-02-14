import { useEffect, FC, useCallback, useState, Dispatch, SetStateAction,}  from "react";
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
import PatrolInfo from "./PatrolInfo";
import { Container } from "./style/Patrol.styles";
import Route from "./Route";
import MobileDrawer from "../../components/drawer/MobileDrawer";
import MobileDrawerContent from "./MobileDrawerContent";

interface PatrolBaseProps {
    drawerOpen: boolean;
    setIsMap: Dispatch<SetStateAction<boolean>>;
};

const Patrol: FC<PatrolBaseProps> = ({drawerOpen : navDrawerOpen, setIsMap}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:771px)');

    const [handleOpen, open, setOpen] = useClick();

    const [swipeOpen, setSwipeOpen] = useState(false);

    const [selectedPatrol, setSelectedPatrol] = useState<string>("");

    const [checked, setChecked] = useState(false);

    const {loading, data: patrols, makeRequest: readAllPatrols } = useAxios<ReadAllPatrolsResponse>();

    const {data: patrolGPS, makeRequest: getPatrolGPS } = useAxios<GetPatrolResponse>();

    const handleSubDrawerChange = useCallback(() => {
        if (navDrawerOpen && mediaMatches) {
            setOpen(false);
        }
    }, [navDrawerOpen, mediaMatches]);

    const toggleSwipDrawer = () => {
        setSwipeOpen((prev)=> !prev);
    };

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

    useEffect(() => {
        setIsMap(true);
        return () => {
            return setIsMap(false);
        }
    }, []);

    return (
        <>
        {
            mediaMatches ? 
            <>
            {
                !checked ? 
                <MobileDrawer
                    drawerBleeding={56}
                    height={400}
                    toggleSwipDrawer={toggleSwipDrawer}
                    swipeOpen={swipeOpen}
                    mobileDrawerTitle={"Active Trips"}
                    disableSwipeToOpen={false}
                    hideBackdrop={true}
                    puller={true}
                    renderChildren={
                        () => 
                            <MobileDrawerContent 
                                patrols={patrols ? patrols.data : []}
                                selectedPatrol={selectedPatrol}
                                setSelectedPatrol={setSelectedPatrol}
                                setChecked={setChecked}
                                checked={checked}
                                toggleSwipDrawer={toggleSwipDrawer}
                            />
                    }
                />
                :
                null
            }
            </>
            :
            <PatrolDrawer 
                open={open} 
                navDrawerOpen={navDrawerOpen}
                patrols={patrols ? patrols.data : []}
                selectedPatrol={selectedPatrol}
                setSelectedPatrol={setSelectedPatrol}
                setChecked={setChecked}
                checked={checked}
            />
        }
        <Container 
            open={navDrawerOpen} 
            checked={checked}
            mobileOpen={swipeOpen}
            matches={mediaMatches}
        >
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
                {(patrols !== undefined) && 
                    <PatrolInfo 
                        patrolData={patrols.data.filter((item) => item.patrolId === selectedPatrol)[0]} 
                        checked={checked}
                        setChecked={setChecked}
                        setSelectedPatrol={setSelectedPatrol}
                    />
                }
                <Route
                    patrolGPS={patrolGPS ? patrolGPS.data : []}
                    checked={checked}
                    selectedPatrol={selectedPatrol}
                />
            </MapContainer>
        </Container>
        </>
    )
};

export default Patrol;