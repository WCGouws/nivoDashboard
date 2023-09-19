import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './assets/scenes/global/topBar';
import SideBar from './assets/scenes/global/sideBar';
import DashBoard from './assets/scenes/dashboard';
import { Grid } from '@mui/material';


function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <Grid container spacing={2}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='app'>
              <SideBar />
              <main className='content'><TopBar />
                <Routes>
                  <Route path='/' element={<Navigate to="/all" />} />
                  <Route path="/all" element={<DashBoard endPoint={"all"} />} />
                  <Route path="/students" element={<DashBoard endPoint={"students"} />} />
                  <Route path="/staff" element={<DashBoard endPoint={"staff"} />} />
                  <Route path="/affiliates" element={<DashBoard endPoint={"affiliates"} />} />
                </Routes>
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </Grid>
    </>
  )
}

export default App
