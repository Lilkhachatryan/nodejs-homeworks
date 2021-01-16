import React from 'react';
import './App.scss';
import Router from "./Router";
import {NotificationContainer} from "react-notifications";

function App() {
  return (
      <div className="PageContainer">
          <Router />
          <NotificationContainer/>
      </div>
  );
}

export default App;
