import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "/src/App";
import Axios from 'axios'

export default function Contracts() {
  const placeholder = {SkinImage: `placeholder.webp`, ItemPrice: "0"}
  const [item1, setItem1] = useState(placeholder)
  const [item2, setItem2] = useState(placeholder)
  const [item3, setItem3] = useState(placeholder)
  const [item4, setItem4] = useState(placeholder)
  const [item5, setItem5] = useState(placeholder)
  const [item6, setItem6] = useState(placeholder)
  const [item7, setItem7] = useState(placeholder)
  const [item8, setItem8] = useState(placeholder)
  const [item9, setItem9] = useState(placeholder)
  const [itemwindow, setItemwindow] = useState(false)
  const { userID } = useContext(AppContext);
  const [Inventory, setInventory] = useState([])

  useEffect(() => {
    Axios.get(`http://localhost:3030/api/getInventory3/${userID}`).then((response)=> {
      setInventory(response.data);
    })
  }, [])  

  return (
    <div className="flex justify-center align-bottom">
      <div className="bg-slate-800 rounded-cool text-white divide-y-2 w-3/5 p-3">
        <h1 className="text-4xl font-bold text-slate-200 py-2" >
          Contracts 📃
        </h1>
        <>
        {itemwindow && 
          <div className=" z-50 fixed h-[80%] w-[80%] left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] flex justify-center">
            <div className="bg-slate-800 flex justify-center rounded-cool border-4 border-slate-600">
              <div className="grid grid-cols-5 overflow-y-scroll w-[100%] p-2">
                {Inventory.map(item=>(
                <div className="px-2 m-2 box-content rounded-cool bg-slate-700 ">
                  <img src={`src/images/skins/${item.SkinImage}`}></img>
                  <h1>Name: {item.SkinName}</h1>
                  <h1>Wear:{item.QualityName}</h1>
                  <h1>Rarity: {item.RarityName}</h1>
                  <h1>{item.ItemPrice} Tokens</h1>
                  <h1>Amount: {item.Amount}</h1>
                  <button 
                    className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 my-2"
                    onClick={()=>{setItemwindow(false), setItem1(item)}}
                  >
                    Select
                  </button>
                </div>
                ))}
              </div>
            </div>
          </div>
        }
        {itemwindow && <div className="z-40 fixed w-[100%] h-[100%] top-0 left-0 blur bg-black opacity-[0.5]"></div>}
          <div className="grid grid-cols-3">
            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item1.SkinImage}`}></img>
              <h1>Skin name: {item1.SkinName}</h1>
              <h1>Skin wear:{item1.QualityName}</h1>
              <h1>Skin rarity: {item1.RarityName}</h1>
              <h1>Skin price: {item1.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>setItemwindow(true)}
              >
                Select skin
              </button>
            </div>

            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item2.SkinImage}`}></img>
              <h1>Skin name: {item2.SkinName}</h1>
              <h1>Skin wear:{item2.QualityName}</h1>
              <h1>Skin rarity: {item2.RarityName}</h1>
              <h1>Skin price: {item2.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>console.log("mmmm spicy")}
              >
                Select skin
              </button>
            </div>

            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item3.SkinImage}`}></img>
              <h1>Skin name: {item3.SkinName}</h1>
              <h1>Skin wear:{item3.QualityName}</h1>
              <h1>Skin rarity: {item3.RarityName}</h1>
              <h1>Skin price: {item3.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>console.log("mmmm spicy")}
              >
                Select skin
              </button>
            </div>

            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item4.SkinImage}`}></img>
              <h1>Skin name: {item4.SkinName}</h1>
              <h1>Skin wear:{item4.QualityName}</h1>
              <h1>Skin rarity: {item4.RarityName}</h1>
              <h1>Skin price: {item4.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>console.log("mmmm spicy")}
              >
                Select skin
              </button>
            </div>

            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item5.SkinImage}`}></img>
              <h1>Skin name: {item5.SkinName}</h1>
              <h1>Skin wear:{item5.QualityName}</h1>
              <h1>Skin rarity: {item5.RarityName}</h1>
              <h1>Skin price: {item5.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>console.log("mmmm spicy")}
              >
                Select skin
              </button>
            </div>

            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item6.SkinImage}`}></img>
              <h1>Skin name: {item6.SkinName}</h1>
              <h1>Skin wear:{item6.QualityName}</h1>
              <h1>Skin rarity: {item6.RarityName}</h1>
              <h1>Skin price: {item6.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>console.log("mmmm spicy")}
              >
                Select skin
              </button>
            </div>
            
            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item7.SkinImage}`}></img>
              <h1>Skin name: {item7.SkinName}</h1>
              <h1>Skin wear:{item7.QualityName}</h1>
              <h1>Skin rarity: {item7.RarityName}</h1>
              <h1>Skin price: {item7.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>console.log("mmmm spicy")}
              >
                Select skin
              </button>
            </div>
            
            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item8.SkinImage}`}></img>
              <h1>Skin name: {item8.SkinName}</h1>
              <h1>Skin wear:{item8.QualityName}</h1>
              <h1>Skin rarity: {item8.RarityName}</h1>
              <h1>Skin price: {item8.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>console.log("mmmm spicy")}
              >
                Select skin
              </button>
            </div>
            
            <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all">
              <img src={`src/images/skins/${item9.SkinImage}`}></img>
              <h1>Skin name: {item9.SkinName}</h1>
              <h1>Skin wear:{item9.QualityName}</h1>
              <h1>Skin rarity: {item9.RarityName}</h1>
              <h1>Skin price: {item9.ItemPrice} Tokens</h1>
              <button 
                className="cursor-pointer text-xl text-slate-900 w-[100%] h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                onClick={()=>console.log("mmmm spicy")}
              >
                Select skin
              </button>
            </div>

          </div>
        </>
      </div>
    </div>
  );
}
