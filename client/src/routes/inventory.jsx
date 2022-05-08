import Axios from 'axios'
import { useState, useEffect, useContext } from "react";
import { AppContext } from "/src/App";
export default function Inventory() {
  const { userID } = useContext(AppContext);
  const { token } = useContext(AppContext);
  const { setToken } = useContext(AppContext);
  const [Inventory, setInventory] = useState([])

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getInventory3/${userID}`).then((response)=> {
      setInventory(response.data);
    })
  }, [])  

  const sellItem = (itemID, itemValue, amount) => {
        sendTokens(itemValue)
        setToken(token+itemValue),
        deleteItem(itemID, amount)
  }

  const sendTokens = (changeval) => 
  {
    Axios.post("http://localhost:3030/api/setToken",
      {
        UserID: userID,
        Token: changeval
      }
    )
  }

  const deleteItem = (itemID, amount) => {
    if (amount <= 1){
      Axios.delete(`http://localhost:3030/api/deleteItem/${userID}/${itemID}`)
    }
    else{
      Axios.delete(`http://localhost:3030/api/deleteOneItem/${userID}/${itemID}`)
    }
  }

  return (
<div className="flex justify-center align-bottom">
<div className="bg-slate-800 rounded-cool text-white divide-y-2 w-3/5 p-3">
  <h1 className="text-4xl font-bold text-slate-200 py-2" >
    Inventory 💼
  </h1>
  <div className="grid-cols-5 grid p-3 mt-2">
    {Inventory.map(item => (
            <div key={item.IDItem} className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
            hover:bg-gray-700 hover:px-3 hover:m-0.5 hover:border-2 hover:border-white-200
            transition-all"
            >
              <img className="" src={`src/images/skins/${item.SkinImage}`} alt={item.SkinImage}/>
              <h1 className="hover:text-orange-300 font-bold">
                Name: {item.SkinName}
              </h1>
              <h1 className="hover:text-orange-300 basis-1/2">
                Rarity: {item.RarityName}
              </h1>
              <h1 className="hover:text-orange-300 basis-1/2">
                Wear: {item.QualityName}
              </h1>
              <h1 className="hover:text-orange-300 basis-1/2">
                From: {item.CaseName}
              </h1>
              <h1 className="hover:text-orange-300 basis-1/2">
                Price: {item.ItemPrice}
              </h1>
              <h1 className="hover:text-orange-300 basis-1/2">
                Amount: {item.Amount}x
              </h1>
              <button 
                onClick={()=>sellItem(item.IDItem, item.ItemPrice, item.Amount)}
                className=' border-2 border-rose-600 bg-rose-400 hover:bg-rose-600 text-rose-900 hover:text-rose-50 w-[100%] rounded-cool '  
              >
                Sell
              </button>
            </div>
    ))}
  </div>
</div>
</div>
    );
  }