import { useLocation, useHistory } from 'react-router-dom';
import { FC, useState } from "react";
import * as MUI from "@mui/material";
import * as MuiIcons from "@mui/icons-material/";
import { StyledTitle } from '../typography';
import { BreadcrumbsContainer, Breadcrumbs, BreadCrumbsMenu, StyledLink, ActiveLink } from './Nav.styles';

interface NavBaseProps{
    navLink?: string[];
    pageTitle?: string  | string[];
}

interface ITableClick {
    rowData: any;
    last?: string;
}

const Navigation: FC<NavBaseProps>  = (props)=>{
    
    const { navLink, pageTitle} = props;
    const location = useLocation();
    const history = useHistory();
    const mediaMatches = MUI.useMediaQuery('(max-width:576px)');
    const rowData = location.state as ITableClick;
    const pathNames = location.pathname.split("/").filter(x => x);
   
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (navLink === undefined){
        return (
            <StyledTitle>{pageTitle}</StyledTitle>
        )
    } else {
        return (
            <BreadcrumbsContainer>
                {(!mediaMatches || navLink.length < 3 ) ? 
                    <Breadcrumbs 
                        aria-label="breadcrumb"
                        separator={
                            <MuiIcons.NavigateNext fontSize="small" sx={{marginBottom:'0px', color:'text.primary', padding:'0px'}}/>
                        }
                    >
                        {navLink && navLink.map((link, index) => {
                            return (
                                (index !== navLink.length-1) ?
                                <StyledLink
                                    key={index}
                                    component="a"
                                    onClick={() => {
                                        if(rowData && rowData.last){
                                            history.push('/dashboard')
                                        }else {
                                            if(index === 0) {
                                                history.push(`/${pathNames[index]}`)
                                            
                                            }else {
                                                const to = `/${pathNames[0]}/${pathNames.slice(1, index + 1).join("/")}`;
                                                history.goBack();
                                            }          
                                        }
                                    }}
                                >
                                    {(rowData && rowData.last) ? 'dashboard' : link}
                                </StyledLink> 
                                : 
                                <ActiveLink key={index}>
                                    {link}
                                </ActiveLink>
                            )
                        })}
                    </Breadcrumbs>
                    :
                    <>
                    <Breadcrumbs aria-label="breadcrumb">
                        <MUI.Box></MUI.Box>
                        <MUI.Button
                            id="breadcrumb-button"
                            endIcon={<MuiIcons.KeyboardArrowDown />}
                            onClick={handleClick}
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '16px',
                            }}
                        >
                            {navLink[navLink.length - 1]}   
                        </MUI.Button>
                    </Breadcrumbs>
                    </>
                }
                <BreadCrumbsMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                      'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    {navLink && navLink.map((link, index) => {
                        return (
                            (index !== navLink.length-1) ?
                            <MUI.MenuItem
                                key={index}
                                disableRipple
                                onClick={() => {
                                    if(rowData && rowData.last){
                                        history.push('/dashboard')
                                    }else {
                                        if(index === 0) {
                                            history.push(`/${pathNames[index]}`)
                                        
                                        }else {
                                            const to = `/${pathNames[0]}/${pathNames.slice(1, index + 1).join("/")}`;
                                            history.goBack();
                                          }          
                                    }
                                }}
                            >
                                {navLink[index]}  
                            </MUI.MenuItem>
                            :
                            null
                        )
                    })}
                </BreadCrumbsMenu>
            </BreadcrumbsContainer>
        )
    }
}

export default Navigation;