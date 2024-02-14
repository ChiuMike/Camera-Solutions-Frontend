import { useState, FC, useContext, Dispatch, SetStateAction } from 'react';
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { IPatrolDto } from '../../apis/patrol';
import { MobileSideBarRoot, PatrolCard } from './style/PatrolDrawer.styles';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/form';
import { useEventChange } from '../../hooks/FormHooks';
import { List } from '../../components/list';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

interface PatrolDrawerBaseProps {
    patrols: IPatrolDto[];
    selectedPatrol: string;
    setSelectedPatrol: Dispatch<SetStateAction<string>>;
    setChecked: Dispatch<SetStateAction<boolean>>;
    checked: boolean;
    toggleSwipDrawer: () => void;
}

const MobileDrawerContent: FC<PatrolDrawerBaseProps> = ({setSelectedPatrol, patrols, setChecked, toggleSwipDrawer}) => {

    const [handleInputChange, inputFields, setInputFields] = useEventChange({ search: ''});

    const handleSelect = (id: string) => {
        setChecked((prev: boolean) => !prev);
        setSelectedPatrol(id);
        toggleSwipDrawer();
    };

    return (
        <MobileSideBarRoot>
            <MUI.Box className="header">
                <MUI.Box className="search-box">
                    <Search>
                        <SearchIconWrapper>
                            <MuiIcons.Search className="search-icon" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            id="search"
                            type="text"
                            name='search'
                            placeholder="Search Device"
                            inputProps={{ 'aria-label': 'search' }}
                            value={inputFields.search}
                            onChange={handleInputChange}
                        />
                    </Search>
                </MUI.Box>
                <MUI.Box className="search-btn">
                    <MUI.IconButton>
                        <MUI.Badge 
                            color="success" 
                            badgeContent={0} 
                            invisible={false} 
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MuiIcons.Tune />
                        </MUI.Badge>
                    </MUI.IconButton>
                </MUI.Box>
            </MUI.Box>
            <MUI.Box className="trips-list">
                <MUI.Box className="content">
                    <List 
                        data={patrols}
                        renderItem={
                            (item, index) => 
                            <PatrolCard 
                                key={index} 
                                selected={false}
                            >
                                <MUI.Box className="card-header">
                                    <MUI.Box className="card-header-contnet">
                                        <MUI.ListItem>
                                            <MUI.ListItemAvatar>
                                                <MUI.Avatar 
                                                    alt="police" 
                                                    src="/images/police.jpg"
                                                />
                                            </MUI.ListItemAvatar>
                                            <MUI.ListItemText primary={item.patrolman} secondary={`#${item.patrolId}`}/>
                                        </MUI.ListItem>
                                        <MUI.ListItem className='patrol-type'>
                                            <MUI.ListItemText primary="Patrol Type" secondary={item.patrolType} />
                                        </MUI.ListItem>
                                    </MUI.Box>
                                    <MUI.Box className="status">
                                        <MUI.Chip label="On Patrol" />
                                    </MUI.Box>
                                </MUI.Box>
                                <MUI.Divider orientation="horizontal" variant="middle" flexItem/>
                                <MUI.Box className="card-content">
                                    <Timeline>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                2023/01/22 09:30 am
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot className="Departure-dot">
                                                    <MUI.Box />
                                                </TimelineDot>
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <MUI.Typography className="title">
                                                    Departure
                                                </MUI.Typography>
                                                <MUI.Typography className="content">
                                                    Sec. 1, Neihu Rd., Neihu Dist., Taipei City
                                                </MUI.Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="text.secondary">
                                                2023/01/22 03:30 pm
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot className="Arrival-dot">
                                                    <MUI.Box />
                                                </TimelineDot>
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <MUI.Typography className="title">
                                                    Arrival
                                                </MUI.Typography>
                                                <MUI.Typography className="content">
                                                    Sec. 2, Bade Rd., Songshan Dist., Taipei City
                                                </MUI.Typography>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                </MUI.Box>
                                <MUI.Divider orientation="horizontal" variant="middle" flexItem />
                                <MUI.Box className="card-footer">
                                    <MUI.ListItem>
                                        <MUI.ListItemAvatar>
                                            {item.deviceName.includes("Salute") ? 
                                                <MUI.Avatar variant="rounded" src="/images/salute-removebg.png" />
                                                :
                                                <MUI.Avatar 
                                                    variant="rounded" 
                                                    src="/images/panther_bg.png"
                                                    sx={{
                                                        "img": {
                                                            transform: 'scale(0.75)'
                                                        }
                                                    }}
                                                />
                                            }
                                        </MUI.ListItemAvatar>
                                        <MUI.Box className="MuiListItemText-root">
                                            <MUI.Typography className="primary">{item.deviceName}</MUI.Typography>
                                            <MUI.Box className="state">
                                                <MUI.Box className="state-dot"/>
                                                <MUI.Typography>
                                                    On Patrol
                                                </MUI.Typography>
                                            </MUI.Box>
                                        </MUI.Box>
                                    </MUI.ListItem>
                                    <MUI.Box className="card-btns">
                                        <MUI.IconButton>
                                            <MuiIcons.Phone />
                                        </MUI.IconButton>
                                        <MUI.IconButton onClick={() => handleSelect(item.patrolId)}>
                                            <MuiIcons.TravelExplore />
                                        </MUI.IconButton>
                                    </MUI.Box>
                                </MUI.Box>
                            </PatrolCard>
                        }
                    />
                </MUI.Box>
            </MUI.Box>
        </MobileSideBarRoot>
    )
};

export default MobileDrawerContent;