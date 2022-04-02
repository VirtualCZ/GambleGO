import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from 'axios';
export default function Cases() {
  const [CaseName, setCaseName] = useState('')
  const [CasePrice, setCasePrice] = useState('')
  const [CaseImage, setCaseImage] = useState('')
  const [CaseList, setCaseList] = useState([])
  const [accountsList, setAccountsList] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3030/api/getCase').then((response)=> {
      setCaseList(response.data);
    })
  }, [])

  useEffect(() => {
    Axios.get('http://localhost:3030/api/getAccounts').then((response)=> {
      setAccountsList(response.data);
    })
  }, [])


  
  return (
    <div class="flex justify-center align-bottom">
      <div class="bg-slate-800 rounded-cool text-white divide-y-2 w-3/5 p-3">
        <h1 className="text-4xl font-bold text-slate-200 py-2" >
          Cases 💼
        </h1>
        <div class="grid-cols-5 grid p-3 mt-2">
          {CaseList.map(item => (
                  <div class=" cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all" >
                    <img class="" src={`src/images/${item.CaseImage}`} alt={item.CaseImage}/>
                    <h1 class="hover:text-orange-300">
                      {item.CaseName}
                    </h1>
                    <div class="flex flex-col-2">
                      <h1 class="hover:text-orange-300 basis-1/2">
                        {item.CasePrice} Tokens
                      </h1>
                      <div class="basis-1/2 flex justify-end">
                        <button class="text-slate-900 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 hover:m-0.5 transition-all"
                          onClick={()=>setTokens(tokens+1000)}
                        >
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
          ))}
        </div>
      </div>
    </div>
  );
}