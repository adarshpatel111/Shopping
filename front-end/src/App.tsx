import { Stack } from '@mui/material'
import './App.css'
import AllRoutes from './components/AllRoutes/AllRoutes'
import Navbar from './components/Navbar/Navbar'
import { rootColors } from './Utilities/rootColors'
import Footer from './components/Footer/Footer'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { LOGINUSERTOKEN } from './Utilities/ReduxConstants/SigninConstans'

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch({ type: LOGINUSERTOKEN, payload: token })
    }
    else {
      dispatch({ type: LOGINUSERTOKEN, payload: null })
    }
  })
  return (
    <Stack sx={{ bgcolor: rootColors.primary, color: rootColors.text }}>
      <Navbar />
      <AllRoutes />
      <Footer />
      <ScrollToTopButton />
    </Stack>
  )
}

export default App
