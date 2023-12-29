import * as MUI from "@mui/material";
import { FC, Dispatch, SetStateAction } from "react";
import { StyledTitle } from "../../components/typography";
import { PatrolCard, SideBarRoot } from "./style/PatrolDrawer.styles";
import * as MuiIcons from "@mui/icons-material/";
import { IPatrolDto } from "../../apis/patrol";
import { SubDrawer } from "../../components/drawer";
import { List } from "../../components/list";

interface PatrolDrawerBaseProps {
    open: boolean;
    navDrawerOpen: boolean;
    patrols: IPatrolDto[];
    selectedPatrol: string;
    setSelectedPatrol: Dispatch<SetStateAction<string>>;
    setChecked: Dispatch<SetStateAction<boolean>>
}

const PatrolDrawer: FC<PatrolDrawerBaseProps> = ({open, navDrawerOpen, setSelectedPatrol, patrols, selectedPatrol, setChecked}) => {

    const mediaMatches = MUI.useMediaQuery('(max-width:770px)');
    const theme = MUI.useTheme();

    const handleSelect = (id: string) => {
        setChecked((prev: boolean) => {
            if(!prev) {
                return true;
            }
            return true;
        });
        setSelectedPatrol(id)
    }

    return (
        <SubDrawer 
            subDrawerWidth={260}
            subDrawerOpen={open}
            navDrawerOpen={navDrawerOpen}
            mediaMatches={mediaMatches }
            noDrawerHeader={true}
            renderChildren={
                () => 
                <SideBarRoot>
                    <MUI.Box className="logs-title-box">
                        <StyledTitle>PATROL</StyledTitle>
                        <MUI.Divider variant="middle"/>
                        <MUI.Box className="search-bar">
                            <MUI.Typography variant="subtitle1">TRIPS</MUI.Typography>
                            <MUI.Stack direction={"row"} gap={1}>
                                <MUI.IconButton>
                                    <MuiIcons.Search />
                                </MUI.IconButton>
                                <MUI.IconButton>
                                    <MuiIcons.FilterAlt />
                                </MUI.IconButton>
                            </MUI.Stack>
                        </MUI.Box>
                    </MUI.Box>
                    <MUI.Box className="mission-list" sx={{mb: 2}}>
                        <MUI.Box className="inner">
                            <List 
                                data={patrols}
                                renderItem={
                                    (item, index) => 
                                    <PatrolCard 
                                        variant="outlined" 
                                        key={index} 
                                        selected={selectedPatrol === item.patrolId}
                                        sx={{
                                            background: theme.palette.mode === "light" ? '#FFF': '#323232',
                                        }}
                                    >
                                        <MUI.CardActionArea onClick={() => handleSelect(item.patrolId)}>
                                            <MUI.CardHeader
                                                action={
                                                    <MUI.Chip 
                                                        label="Patroling" 
                                                        size="small"
                                                        sx={{
                                                            borderRadius: '5px',
                                                            backgroundColor: 'rgb(255, 244, 229)',
                                                            color: 'rgb(237, 108, 2)',
                                                            mt: .5
                                                        }}
                                                    />
                                                }
                                                subheader={`#${item.patrolId}`}
                                                sx={{padding: '16px 16px 8px 16px'}}
                                            />
                                            <MUI.Divider variant="middle" />
                                            <MUI.CardContent sx={{padding: '8px 16px', display: 'flex', justifyContent: 'space-between', gap: 2}}>
                                                <MUI.ListItemText primary="Trip type" secondary={item.patrolType} />
                                                <MUI.ListItemText primary="Distance" secondary={item.distance} />
                                            </MUI.CardContent>
                                        </MUI.CardActionArea>
                                    </PatrolCard>
                                }
                            />
                        </MUI.Box>
                    </MUI.Box>
                </SideBarRoot>
            }
        />
    )
};

export default PatrolDrawer;