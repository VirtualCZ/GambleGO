  import { Link } from "react-router-dom";
  import React, { useContext } from 'react';
  import Axios from "axios";
  import { AppContext } from "/src/App";

  const navigation_array = [
    { name: 'Cases', to: "/cases"},
    { name: 'Upgrader', to: "/upgrader" },
    { name: 'Contracts', to: "/contracts" },
    { name: 'Account', to: "/accounts"},
  ]

  export default function Navbar() {
    const { user } = useContext(AppContext);
    const { userID } = useContext(AppContext);
    const { token } = useContext(AppContext);
    const { setToken } = useContext(AppContext);
    const { setTokenchange } = useContext(AppContext);

    const sendTokens = (changeval) => 
    {
      Axios.post("http://localhost:3030/api/setToken",
        {
          UserID: userID,
          Token: changeval
        }
      )
    }

    return (
      <div>
        <nav className="bg-slate-800 text-gray-200 h-14 flex items-center rounded-cool flex-row mb-1.5">

          {/* Menu za pomoci .map a arraye */}
          <div className = "basis-1/3">
          {navigation_array.map(item => (
                      <Link key={item.name} className="p-1.5 px-2 mr-2 ml-1 box-content rounded-cool bg-slate-700 
                      hover:text-orange-300 hover:bg-gray-700
                      transition-all" 
                        to={item.to}
                      >
                        {item.name}
                      </Link>
          ))}
          </div>

          {/* Nazev stranky */}
          <div className="basis-1/3 flex justify-center">
            <Link className="p-1.5 px-2 mr-2 ml-1 box-content rounded-cool bg-slate-700 
            hover:text-orange-300 hover:bg-gray-700 text-2xl
            transition-all" 
            to="/"
            >
              🍀 GambleGO 🎯
            </Link>
          </div>

          {/* Odkaz na uzivatele + tokeny */}
            <div className="basis-1/3 flex flex-row justify-end">
              <div className="bg-slate-700 hover:bg-gray-700 transition-all divide-x py-1.5 px-2 mr-2 ml-1 box-content rounded-cool flex flex-row">
                <button className="pr-1.5 hover:text-orange-500
                transition-all" onClick={()=>{sendTokens(token+1000),setToken(token+1000)}}>Add Tokens</button>              
                <p
                className="px-1.5 hover:text-orange-500 
                transition-all"
                >
                  {token} Tokens
                </p>
                <Link 
                className="pl-1.5 hover:text-orange-500
                transition-all"
                to={`/inventory/${userID}`}>
                  {user} {userID}
                </Link>
              </div>
            </div>

        </nav>
      </div>
    );
  }