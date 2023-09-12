import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './assets/scenes/global/topBar';
import SideBar from './assets/scenes/global/sideBar';
import DashBoard from './assets/scenes/dashboard';
import Student from './assets/scenes/students/students';
import Staff from './assets/scenes/staff/staff';
import Affiliates from './assets/scenes/affiliates/affiliates';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';


function App() {
  const [theme, colorMode] = useMode();
  // Set state vir data

  // useEffect(() => {
  //   const ws = new WebSocket("ws://localhost:8765");
  //   ws.onopen = () => {
  //     console.log("Connection Established!");
  //     ws.send("start");

  //   };
  //   ws.onmessage = (event) => {
  //     const replaceSingleQuote = event.data.replace(/[']/g, '"');
  //     const response = JSON.parse(JSON.stringify(replaceSingleQuote));
  //     console.log(response);
  //     setResponseData(response)
  //   }
  //   ws.onclose = () => {
  //     console.log("Connection Closed!");
  //     //initWebsocket();
  //   };

  //   ws.onerror = (err) => {
  //     console.log("WS Error", err);
  //   };
  // },
  //   [])


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
                  {/* <Route path="/students" element={<Student />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/affiliates" element={<Affiliates />} /> */}
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
