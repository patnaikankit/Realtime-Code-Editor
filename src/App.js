import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    // toast container declared globally so that it can be accessed from anywhere
    <div>
    {/* Make sure it's placed at the top of the div */}
    <Toaster
    
    // assigning position
    position='top-right'
    
    // Default style for notification 
    toastOptions={{
      success: {
        theme: {
        primary: '#4aee88'
      },
      },
      }}
    />
   

    {/* Wrapping all the routes under browserstack */}
    <BrowserRouter>
    {/* Mentioning all the routes */}
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/editor/:roomId' element={<Editor />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
