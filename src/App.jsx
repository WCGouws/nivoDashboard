import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './assets/scenes/global/topBar';
import DashBoard from './assets/scenes/dashboard';
import { Grid } from '@mui/material';


function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <Grid container spacing={3}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='app'>
              <main className='content'><TopBar />
                <Routes>
                  <Route path='/' element={<Navigate to="/all" />} />
                  <Route path="/all" element={<DashBoard endPoint={"all"} />} />
                  <Route path="/students" element={<DashBoard endPoint={"student"} />} />
                  <Route path="/employees" element={<DashBoard endPoint={"employee"} />} />
                  <Route path="/affiliates" element={<DashBoard endPoint={"affiliate"} />} />
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
