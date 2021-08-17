import './App.css';
import {Switch,Route} from "react-router-dom"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import HomePage from "./components/HomePage"
import { useState } from 'react';

function App() {
  const [currentUserName,setCurrentUserName]=useState("")
  const [currentUserFaceDetectCount,setCurrentUserFaceDetectCount]=useState("")
  const [currentUserId,setCurrentUserId]=useState("")
  return (
    <div className="App">
      <header className="App-header">
        <p>Face Detection App</p>
      </header>
      <Switch>
        <Route path="/register">
          <RegisterPage/>
        </Route>
        <Route path="/homepage">
          <HomePage currentUserName={currentUserName} currentUserFaceDetectCount={currentUserFaceDetectCount} setCurrentUserFaceDetectCount={setCurrentUserFaceDetectCount} currentUserId={currentUserId}/>
        </Route>
        <Route path="/">
          <LoginPage setCurrentUserName={setCurrentUserName} setCurrentUserFaceDetectCount={setCurrentUserFaceDetectCount} setCurrentUserId={setCurrentUserId}/>
        </Route>
      </Switch>
    </div>
    

  );
}

export default App;
