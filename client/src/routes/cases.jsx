import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Axios from 'axios';

import { AppContext } from "/src/App";

export default function Cases() {
  const [CaseList, setCaseList] = useState([])
  const { userID } = useContext(AppContext);

  useEffect(() => {
    Axios.get('http://localhost:3030/api/getCase').then((response)=> {
      setCaseList(response.data);
    })
  }, [])

  return (
    <div className="flex justify-center align-bottom">
      <div className="bg-slate-800 rounded-cool text-white divide-y-2 w-3/5 p-3">
        <h1 className="text-4xl font-bold text-slate-200 py-2" >
          Cases 💼
        </h1>
        <div className="grid-cols-5 grid p-3 mt-2">
          {CaseList.map(item => (
              <Link key={item.IDCase} to={`/case_detail/${item.IDCase}`}>
                  <div className="hover:px-3 cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all" 
                  value={item.CaseName}
                  >
                    <img className="" src={`src/images/${item.CaseImage}`} alt={item.CaseImage}/>
                    <h1 className="hover:text-orange-300">
                      {item.CaseName}
                    </h1>
                    <h1 className="hover:text-orange-300 basis-2/3">
                        {item.CasePrice} Tokens
                    </h1>
                </div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
}