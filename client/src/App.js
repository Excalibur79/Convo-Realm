import React from 'react';
import {Route,Switch} from "react-router-dom";
import RegisterPage from "./Components/RegisterPage";
import LoginPage from "./Components/LoginPage";
import ChatApp from "./Components/ChatApp";
import {UserProvider} from "./Contexts/UserContext";
import {ChatProvider} from "./Contexts/ChatContext";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ChatProvider>
            <Switch>
              <Route exact path="/" render={(routeProps)=><ChatApp {...routeProps}/>}/>
              <Route exact path="/register" render={(routeProps)=><RegisterPage {...routeProps} />}/>
              <Route exact path="/login" render={(routeProps)=><LoginPage {...routeProps}/>}/>
          </Switch>
        </ChatProvider>
      
      </UserProvider>
     
    </div>
  );
}

export default App;
