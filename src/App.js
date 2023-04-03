
import './App.css';
import { useRef, useState } from 'react';
import Auth from './components/Auth';
import Cookies from "universal-cookie"
import Chat from './components/Chat';

const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null)
  

  if(!isAuth){
    return <div>
      <Auth setIsAuth={setIsAuth}/>
    </div>
  }
  
  return (
    <div>
      {
        room ? (
          <Chat room={room}/>
        ) : (
          <div className='room'>
            <h1>Enter room Name</h1>
            <input type="text" ref={roomInputRef}/>
            <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Into Room</button>
        </div>)
      }
    </div>
  );
}

export default App;
