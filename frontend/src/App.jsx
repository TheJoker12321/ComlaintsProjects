import './App.css'
import HomePage from './components/HomePage/HomePage'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SubmitPage from './components/SubmitPage/SubmitPage';
import AdminPage from './components/AdminPage/AdminPage';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import { UserProvider } from './context/UserProvider';

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='message'>
              <Route path='send' element={<SubmitPage />}/>
            </Route>
            <Route path='admin'>
              <Route path='getMessages' element={<AdminPage />}/>
              <Route path='login' element={<LoginAdmin />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
  </>
  )
}

export default App
