import { useState, useEffect, useRef, useContext } from "react";
import Axios from 'axios'
import { AppContext } from "/src/App";

export default function Accounts() {
    const [accountsList, setAccountsList] = useState([])
    const [AccountName, setAccountName] = useState("")
    const [Tokens, setTokens] = useState(0)
    const { setUser } = useContext(AppContext);
    const { setToken } = useContext(AppContext);
    const { setUserID } = useContext(AppContext);
    const inputRefA = useRef(null)
    const inputRefT = useRef(null)

    const selectAccount = (selectuserid, selectuser, selecttoken) => {
        setUser(selectuser),
        setToken(selecttoken)
        setUserID(selectuserid)
        localStorage.setItem('selectuserid', selectuserid)
    }

    useEffect(() => {
      Axios.get('http://localhost:3030/api/getAccounts').then((response)=> {
        setAccountsList(response.data);
      })
    }, [])

    const submitAccount = () => {
      Axios.post("http://localhost:3030/api/insertAccount", {
          OwnerNickname: AccountName,
          Token: Tokens
          
      },
      inputRefA.current.value= "",
      inputRefT.current.value= ""
      )
      setAccountsList([
        ...accountsList,{
          AccountName: AccountName, 
          Tokens: Tokens
        }
        
      ])
    }

    const deleteAccount = (IDOwner) => {
      Axios.delete(`http://localhost:3030/api/deleteAccount/${IDOwner}`)
  }

    return (
      <main className="text-3xl font-bold text-slate-200">
        <h2>Accounts 👥</h2>
        <div className="flex justify-center">
            <div>
            <h1 className="flex justify-center">Add account</h1>
            <label>Username:</label><br/>
            <input 
                name="AccountName" 
                type="text" 
                className="rounded-cool mb-4 mt-2 mx-2 px-2 text-black" 
                placeholder="username"
                ref={inputRefA}
                onChange={(e) => {
                    setAccountName(e.target.value)
                }}
            />
            <br/>
            <label>Tokens:</label><br/>
            <input 
                name="Tokens" 
                type="number" 
                className="rounded-cool mb-4 mt-2 mx-2 px-2 text-black" 
                placeholder="tokens count"
                ref={inputRefT}
                onChange={(e) => {
                    setTokens(e.target.value)
                  }}
            />
            <br/>
            <div className=" mb-5 flex justify-center">
            <button 
                className="hover:text-orange-300 "
                onClick={submitAccount}
                >
                Add an account
            </button>
            </div>
        </div>
        </div>
        <div className="grid-cols-3 grid">
        {accountsList.map((val)=>{
          return(
            
            <div key={val.IDOwner} className=" p-1.5 px-2 m-2 rounded-cool bg-slate-700 hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200 box-content
            transition-all ">
                <div className="flex flex-row">
                    <h1 className="basis-1/2">Name: {val.OwnerNickname}</h1>
                    <h1 className="basis-1/2 flex justify-end">Tokens: {val.Token}</h1>
                </div>
                <div className="flex flex-col-2">
                    <button className="hover:text-orange-300 basis-1/2" onClick={() => {selectAccount(val.IDOwner, val.OwnerNickname, val.Token)}}> Select 👤</button>
                    <button className="hover:text-orange-300 basis-1/2" onClick={() => {deleteAccount(val.IDOwner)}}> Delete ❌</button>
                </div>
            </div>
            
          ) 
        }) }
        </div>
      </main>
    );
  }