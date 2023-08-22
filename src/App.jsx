import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import TopBar from './assets/scenes/global/topBar';
import SideBar from './assets/scenes/global/sideBar';
import DashBoard from './assets/scenes/dashboard';
import Student from './assets/scenes/students/students';
import Staff from './assets/scenes/staff/staff';
import Affiliates from './assets/scenes/affiliates/affiliates';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className='app'>
            <SideBar />
            <main className='content'><TopBar />
              <Routes>
                <Route path="/" element={<DashBoard />} />
                <Route path="/students" element={<Student />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/affiliates" element={<Affiliates />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App
