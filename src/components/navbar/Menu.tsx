import * as MUI from "@mui/material";
import * as React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { useHistory } from "react-router-dom";
import { MobileMenu, MenuStack } from "./Menu.styles";

interface MenuBaseProps {
    themeMode: string;
    handleChangeTheme: () => void;
    handleSignout: () => void;
    tokens: boolean;
}

const Menu: React.FC<MenuBaseProps> = ({ themeMode, handleChangeTheme, handleSignout, tokens }) => {

    const theme = MUI.useTheme();
    const history = useHistory();
    const matches = MUI.useMediaQuery('(max-width:720px)');

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<HTMLElement | null>(null);
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    }

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    }

    const returnToHome = () => {
        history.push("/");
    }

    return (
        <>
        <MenuStack direction={"row"}>
            {/* <MUI.IconButton onClick={handleChangeTheme}>
                <MUI.Typography variant="button" sx={{fontWeight:'bold', color: 'text.common', mr:1 }}>
                    {theme.palette.mode} mode
                </MUI.Typography>
                {themeMode === 'dark' ? <MuiIcons.Brightness4 fontSize="medium"/> : <MuiIcons.Brightness7 sx={{color: 'text.common'}} fontSize="medium"/>}
            </MUI.IconButton> */}
            <MUI.IconButton>
                <MUI.Typography variant="button" sx={{fontWeight:'bold', color: 'text.common', mr:1 }}>
                    Time zone
                </MUI.Typography>
                <MuiIcons.ManageHistory sx={{color: 'text.common',}} fontSize="medium" />
            </MUI.IconButton>
            <MUI.IconButton  onClick={returnToHome}>
                <MUI.Typography variant="button" sx={{fontWeight:'bold', color: 'text.common', mr:1 }}>
                    Home
                </MUI.Typography>
                <MuiIcons.Home sx={{color: 'text.common',}} fontSize="medium" />
            </MUI.IconButton>
            {
                tokens ? 
                <MUI.IconButton onClick={handleSignout}>
                    <MUI.Typography variant="button" sx={{fontWeight:'bold', color: 'text.common', mr: 1 }}>
                        Sign out
                    </MUI.Typography>
                    <MuiIcons.Logout sx={{color: 'text.common'}} fontSize="medium"/>
                </MUI.IconButton>
                :
                null
            }
        </MenuStack>

        <MUI.Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <MUI.IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
            >
                <MuiIcons.MoreVert />
            </MUI.IconButton>
        </MUI.Box>

        <MobileMenu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MUI.MenuItem sx={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                <MUI.IconButton onClick={handleChangeTheme}>
                    <MUI.Typography variant="button" sx={{fontWeight:'bold', color: 'text.common', mr:1 }}>
                        {theme.palette.mode} mode
                    </MUI.Typography>
                    {themeMode === 'dark' ? <MuiIcons.Brightness4 fontSize="medium"/> : <MuiIcons.Brightness7 sx={{color: 'text.common'}} fontSize="medium"/>}
                </MUI.IconButton>
                <MUI.IconButton>
                    <MUI.Typography variant="button" sx={{fontWeight:'bold', color: 'text.common', mr:1 }}>
                        Time zone
                    </MUI.Typography>
                    <MuiIcons.ManageHistory sx={{color: 'text.common',}} fontSize="medium" />
                </MUI.IconButton>
                <MUI.IconButton  onClick={returnToHome}>
                    <MUI.Typography variant="button" sx={{fontWeight:'bold', color: 'text.common', mr:1 }}>
                        Home
                    </MUI.Typography>
                    <MuiIcons.Home sx={{color: 'text.common',}} fontSize="medium" />
                </MUI.IconButton>
                {
                    tokens ? 
                    <MUI.IconButton onClick={handleSignout}>
                        <MUI.Typography variant="button" sx={{fontWeight:'bold', color: 'text.common', mr: 1 }}>
                            Sign out
                        </MUI.Typography>
                        <MuiIcons.Logout sx={{color: 'text.common'}} fontSize="medium"/>
                    </MUI.IconButton>
                    :
                    null
                }
            </MUI.MenuItem>
        </MobileMenu>
        
        </>
    )

};

export default Menu;