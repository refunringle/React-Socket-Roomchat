
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './components/pages/Login/Login';
import Chat from './components/pages/Chat/Chat';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>} />
        <Route exact path='/chat/:name/:room' element={<Chat/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
