import { Link } from "react-router-dom";
import React, { useState } from 'react';
import currentUser from './routes/accounts'

const navigation_array = [
  { name: 'Cases', to: "/cases"},
  { name: 'Upgrader', to: "/upgrader" },
  { name: 'Contracts', to: "/contracts" },
  { name: 'Cases (old)', to: "/cases_old"},
  { name: 'Account', to: "/accounts"},
]
var username = ["User"];
export default function Navbar() {
  const [tokens , setTokens] = useState(100)
  return (
    <div>
      <nav class="bg-slate-800 text-gray-200 h-14 flex items-center rounded-cool flex-row mb-1.5 ">

        {/* Menu za pomoci .map a arraye */}
        <div class = "basis-1/3">
        {navigation_array.map(item => (
                    <Link class="p-1.5 px-2 mr-2 ml-1 box-content rounded-cool bg-slate-700 
                    hover:text-orange-300 hover:bg-gray-700
                    transition-all" 
                      to={item.to}
                    >
                      {item.name}
                    </Link>
        ))}
        </div>

        {/* Nazev stranky */}
        <div class="basis-1/3 flex justify-center">
          <Link class="p-1.5 px-2 mr-2 ml-1 box-content rounded-cool bg-slate-700 
          hover:text-orange-300 hover:bg-gray-700 text-2xl
          transition-all" 
          to="/"
          >
            🍀 GambleGO 🎯
          </Link>
        </div>

        {/* Odkaz na uzivatele + tokeny */}
          <div class="basis-1/3 flex flex-row justify-end">
            <div class="bg-slate-700 hover:bg-gray-700 transition-all divide-x py-1.5 px-2 mr-2 ml-1 box-content rounded-cool flex flex-row">
              <button class="pr-1.5 hover:text-orange-500
              transition-all" onClick={()=>setTokens(tokens+1000)}>Add Tokens</button>              
              <p
              class="px-1.5 hover:text-orange-500 
              transition-all"
              >
                {tokens} Tokens
              </p>
              <Link 
              class="pl-1.5 hover:text-orange-500
              transition-all"
              to="/inventory">
                {currentUser}
              </Link>
            </div>
          </div>

      </nav>
    </div>
  );
}