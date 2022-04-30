import React, { useState, createContext, useEffect } from "react";
import Axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from "./routes/about";
import Cases from "./routes/cases";
import Upgrader from "./routes/upgrader";
import Contracts from "./routes/contracts";
import Inventory from "./routes/inventory";
import Navbar from "./navbar"
import Accounts from "./routes/accounts"
import CaseDetail from "./routes/caseDetail"
import NotFound from "./routes/notfound"

export const AppContext = createContext(null);

export default function App (){
  const [user, setUser] = useState("No User");
  const [token, setToken] = useState(0);
  const [userID, setUserID] = useState(parseInt(localStorage.getItem('selectuserid')));
  const [UserArr, setUserArr] = useState([]);
  const [FilterArr, setFilterArr] = useState([]);
  const [FilterObj, setFilterObj] = useState();


  //načtu data (pokud v minulosti uživatel zvolil účet)
  useEffect(() => {
    if (typeof userID != 0){
      Axios.get('http://localhost:3030/api/getAccounts').then((response)=> {
        setUserArr(response.data);
      })
    }
  }, [])
  //vyfiltruje řádek z arraye uživatelů který odpovída uloženému userID
  useEffect(() => {
    setFilterArr(UserArr.filter(function(driver){
      return driver.IDOwner === userID
    }))
  }, [UserArr])
  //uloží ho jako objekt místo arraye
  useEffect(() => {
    if (typeof(UserArr) !== 'undefined' && UserArr != null){
      setFilterObj(FilterArr[0])
  }
  }, [FilterArr])
  //a nakonec nastaví Tokeny a Uživatelské jméno
  useEffect(()=> {
    if (typeof(FilterArr) !== 'undefined' && FilterArr[0] != null){
        setToken(FilterObj.Token)
        setUser(FilterObj.OwnerNickname)
    }
  }, [FilterObj])
  
  return (
    <AppContext.Provider value={{ user, setUser, token, setToken, userID, setUserID, }}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="cases" element={<Cases />} />
          <Route path="upgrader" element={<Upgrader />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="inventory/:userID" element={<Inventory />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="case_detail/:id" element={<CaseDetail />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}