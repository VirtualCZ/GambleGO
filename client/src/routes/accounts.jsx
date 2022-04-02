import { useState, useEffect } from "react";
import Axios from 'axios'

export default function Accounts() {
    const [accountsList, setAccountsList] = useState([])
    const [AccountName, setAccountName] = useState("")
    const [Tokens, setTokens] = useState(0)
    const [currentUser, setCurrentUser] = useState("Test")

    const selectAccount = (e) => {
        setCurrentUser(e.target.value)
        console.log(currentUser);
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
            
        })
        setAccountsList([
          ...accountsList,
          {AccountName: AccountName}
        ])
      }
      
    const deleteAccount = (account, tokens) => {
        Axios.delete(`http://localhost:3030/api/delete/${account}//${tokens}`)
      }


    return (
      <main className="text-3xl font-bold text-slate-200">
        <h2>Accounts 👥 {currentUser}</h2>
        <div class="flex justify-center">
            <div>
            <h1 class="flex justify-center">Add account</h1>
            <label>Username:</label><br/>
            <input 
                name="AccountName" 
                type="text" 
                class="rounded-cool mb-4 mt-2 mx-2 px-2 text-black" 
                placeholder="username"
                onChange={(e) => {
                    setAccountName(e.target.value)
                  }}
            />
            <br/>
            <label>Tokens:</label><br/>
            <input 
                name="Tokens" 
                type="number" 
                class="rounded-cool mb-4 mt-2 mx-2 px-2 text-black" 
                placeholder="tokens count"
                onChange={(e) => {
                    setTokens(e.target.value)
                  }}
            />
            <br/>
            <div class=" mb-5 flex justify-center">
            <button 
                class="hover:text-orange-300 "
                onClick={submitAccount}
            >
                Add an account
            </button>
            </div>
        </div>
        </div>
        <div class="grid-cols-3 grid">
        {accountsList.map((val)=>{
          return(
            
            <div class=" p-1.5 px-2 m-2 rounded-cool bg-slate-700 hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200 box-content
            transition-all ">
                <div class="flex flex-row">
                    <h1 class="basis-1/2">Name: {val.AccountName}</h1>
                    <h1 class="basis-1/2 flex justify-end">Tokens: {val.Tokens}</h1>
                </div>
                <div class="flex flex-col-2">
                    <button value={val.AccountName} class="hover:text-orange-300 basis-1/2" onClick={selectAccount}> Select 👤</button>
                    <button class="hover:text-orange-300 basis-1/2" onClick={() => {deleteAccount(val.OwnerNickname, val.Tokens)}}> Delete ❌</button>
                </div>
            </div>
            
          ) 
        }) }
        </div>
      </main>
    );
  }