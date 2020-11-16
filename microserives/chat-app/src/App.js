import React from 'react';
import './App.scss';
import PageContainer from "./assets/styles/App.css";
import Router from "./Router";
import {NotificationContainer} from "react-notifications";

console.log('PageContainer', PageContainer);

function App() {
  return (
      <div className="PageContainer">
          <Router />
          <NotificationContainer/>
      </div>
  );
}

export default App;
