import './App.css';
import * as MUI from "@mui/material";
import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GlobalThemeColor from './theme/GlobalThemeColor';
import Navbar from './components/navbar/Navbar';

const App = () => {

    const [mode, setMode] = React.useState<MUI.PaletteMode>('light');
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const bgMode = MUI.createTheme(GlobalThemeColor(mode));

    const handleChangeTheme = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
        if (mode === 'light') {
            setMode('dark');
            localStorage.setItem("mode", 'dark');
        } else {
            setMode('light');
            localStorage.setItem("mode", 'light');
        }
    }

    React.useEffect(() => {

        const themeMode = localStorage.getItem('mode');

        if (themeMode) {
            themeMode === "light" ? setMode("light") : setMode('dark');
        } else {
            setMode("light");
            localStorage.setItem("mode", 'light');
        }
        
    }, [])

    return (
        <Router>
            <MUI.ThemeProvider theme={bgMode}>
                <Switch>
                    <Route
                        path="/"
                        render={() => (
                            <Navbar 
                                themeMode={mode} 
                                handleChangeTheme={handleChangeTheme}
                                drawerOpen={drawerOpen}
                                setDrawerOpen={setDrawerOpen}
                            />
                        )}
                    />
                </Switch>
            </MUI.ThemeProvider>
        </Router>
    );
}

export default App;
