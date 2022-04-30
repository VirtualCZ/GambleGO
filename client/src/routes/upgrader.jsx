import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "/src/App";
import Axios from 'axios'

export default function Upgrader() {
  const inputRefPerc = useRef(null)
  const { userID } = useContext(AppContext);
  const [ItemsList, setItemsList] = useState([])
  const [SortedItemsList, setSortedItemsList] = useState([])
  const [SortedItemsListB, setSortedItemsListB] = useState([])
  const [Inventory, setInventory] = useState([])
  const [InventorySelect, setInventorySelect] = useState([])
  const [ItemSelect, setItemSelect] = useState([])
  const [ShowSelect, setShowSelect] = useState(false)
  const [toggleSelect, setToggleSelect] = useState(false)
  const [toggleSelectEmpty, setToggleSelectEmpty] = useState(true)
  const [Percentage, setPercentage] = useState(30)
  const [maxgain, setmaxgain] = useState()
  const [wantedprice, setwantedprice] = useState()
  const [ItemPerc, setItemPerc] = useState()

  const [refresh, setrefresh] = useState(true)

  useEffect(() => {
      console.log(ItemSelect)
  }, [ItemSelect])
  
  useEffect(() => {
    setwantedprice(
      parseInt((InventorySelect.ItemPrice) * (parseInt(Percentage)/100 + 1))
    )
    setmaxgain(
      parseInt(InventorySelect.ItemPrice) * 1.99
    )
    console.log(InventorySelect.ItemPrice + " " + "ItemPrice")
    console.log(wantedprice + " " + "wantedprice")
    console.log(maxgain + " " + "maxgain")
  }, [Percentage, toggleSelect, refresh])

  useEffect(() => {Axios.get(`http://localhost:3030/api/getItems`).then((response)=> {setItemsList(response.data)})}, [])  
  useEffect(()=>{setSortedItemsList(ItemsList.slice().sort((a, b) => parseInt(a.ItemPrice) - parseInt(b.ItemPrice)))}, [ItemsList])
  useEffect(()=>{setSortedItemsListB(SortedItemsList.filter((a) => {return (a.ItemPrice<maxgain)}))}, [SortedItemsList])
  useEffect(() => {Axios.get(`http://localhost:3030/api/getInventory3/${userID}`).then((response)=> {setInventory(response.data);})}, [])  

  const selectMiddleFunction = () => {
    setToggleSelect(true)
    setToggleSelectEmpty(false)
  }

  const deleteItem = () => {
    if (InventorySelect.Amount <= 1){
      Axios.delete(`http://localhost:3030/api/deleteItem/${userID}/${InventorySelect.IDItem}`)
    }
    else{
      Axios.delete(`http://localhost:3030/api/deleteOneItem/${userID}/${InventorySelect.IDItem}`)
    }
    window.location.reload(false)
  }

  const submitItem = () => {
    const random = Math.random()* 100
    console.log(ItemPerc)
    console.log(random + " " + "random")
    if(random < ItemPerc)
    {
      console.log("JA"),
      Axios.post("http://localhost:3030/api/insertItem", {
        idItem: ItemSelect.IDItem,
        userID: userID},
      ),
      setInventory([
        ...Inventory,{
          SkinImage: ItemSelect.SkinImage,
          SkinName: ItemSelect.SkinName,
          QualityName: ItemSelect.QualityName,
          RarityName: ItemSelect.RarityName,
          ItemPrice: ItemSelect.ItemPrice,
          Amount: ItemSelect.Amount
        }
      ])
      deleteItem()
    }
    if(random > ItemPerc){deleteItem()}
  }

    return (
      <div className="flex justify-center align-bottom">
        <div className="bg-slate-800 rounded-cool text-white w-3/5 p-3">
          <div className=" divide-y-2">
          <h1 className="text-4xl font-bold text-slate-200 py-2" >
          Upgrader 🔝
          </h1>
          <p/>
          </div>
          <div className="flex flex-row">
            <div className="w-[40%] justify-center flex font-bold text-xl"><h1>Your Items</h1></div>
            <div className="w-[20%] justify-center flex font-bold text-xl"><h1>Selector</h1></div>
            <div className="w-[40%] justify-center flex font-bold text-xl"><h1>Possible Drops</h1></div>
          </div>
          <div className="flex flex-row">

          <div className="grid-cols-3 grid p-3 mt-2 w-[40%] h-[100%]">
            {Inventory.map((val) => (
              <div key={val.IDItem} value={"piko"} className="cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
              hover:bg-gray-700 hover:m-0.5 hover:px-3 hover:border-2 hover:border-white-200"
              onClick={()=>{setInventorySelect(val), setShowSelect(!ShowSelect), selectMiddleFunction() ,setrefresh(!refresh)}}>
                {ShowSelect && <h1 className=" text-green-600 flex justify-center"></h1>}
                <img className="" src={`src/images/skins/${val.SkinImage}`} alt={val.SkinImage}/>
                <h1>{val.SkinName}</h1>
                <h1>{val.QualityName}</h1>
                <h1>{val.RarityName}</h1>
                <h1>{val.ItemPrice} Tokens</h1>
                <h1>{val.Amount} x</h1>
              </div>
            ))}
            </div>

            <div className="p-3 mt-2 w-[20%]">
              
              {toggleSelectEmpty &&
              <div className="cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:bg-gray-700 hover:border-2 hover:border-white-200
                    transition-all">
                <img className="" src={`src/images/skins/placeholder.webp`} alt={"taknicno"}/>
                <h1>Name:</h1>
                <h1>Wear:</h1>
                <h1>Rarity:</h1>
                <h1>Price:</h1>
              </div>
              }
              {toggleSelect &&
                <div className="cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:bg-gray-700 hover:border-2 hover:border-white-200
                    transition-all">
                <img className="" src={`src/images/skins/${InventorySelect.SkinImage}`} alt={InventorySelect.SkinImage}/>
                <h1>{InventorySelect.SkinName}</h1>
                <h1>{InventorySelect.QualityName}</h1>
                <h1>{InventorySelect.RarityName}</h1>
                <h1>{InventorySelect.ItemPrice} Tokens</h1>
              </div>
              }
              <div className="flex flex-auto justify-center">
                <div className="cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:bg-gray-700 hover:border-2 hover:border-white-200
                    transition-all">
                  <h1 onClick={() => {inputRefPerc.current.value= 40, setPercentage(40)}}>40%</h1>
                </div>
                <div onClick={() => {inputRefPerc.current.value= 50, setPercentage(50)}} className="cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                      hover:bg-gray-700 hover:border-2 hover:border-white-200
                      transition-all">
                  <h1>50%</h1>
                </div>
                <div onClick={() => {inputRefPerc.current.value= 60, setPercentage(60)}} className="cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                      hover:bg-gray-700 hover:border-2 hover:border-white-200
                      transition-all">
                  <h1>60%</h1>
                </div>
              </div>
              <div className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                      hover:bg-gray-700 hover:border-1 hover:border-white-200
                      flex flex-auto">
                  <h1 className="whitespace-nowrap">Chance: {""}</h1>
                    <input
                      ref={inputRefPerc}
                      type="number"
                      min="30" max="75" 
                      defaultValue={Percentage}
                      className=" text-black w-[60px]"
                      onChange={(e) => {setPercentage(e.target.value)}}
                    >
                    </input>
                  <h1>{""} %</h1>
              </div>
              <h1 className="flex justify-center text-sm italic">Valid % are from 30 to 75</h1>
              <button
                  className=' border-2 border-green-700 bg-green-400 hover:bg-green-600 text-green-900 hover:text-rose-50 w-[100%] h-10 rounded-cool my-2 transition-all'
                  onClick={()=>submitItem()}
                >
                  Let's go xd
              </button>
              <h1 className="flex justify-center text-center italic text-sm">The "Chance %" refers to the chance of losing your item and your possible gain.</h1>

              
            </div>

            <div className="grid-cols-3 grid p-3 mt-2 w-[40%]">
            {SortedItemsList.filter(item =>  (item.ItemPrice > wantedprice)).map((val) => (
              <div key={val.IDItem} className="cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
              hover:bg-gray-700 hover:m-0.5 hover:px-3 hover:border-2 hover:border-white-200
              transition-all"
              onClick={()=>{ setItemPerc((100-(Math.round(((val.ItemPrice/InventorySelect.ItemPrice)*100)-100)))) , setItemSelect(val) }}>
                <h1 className=" text-green-600 flex justify-center"></h1>
                <img className="" src={`src/images/skins/${val.SkinImage}`} alt={val.SkinImage}/>
                <h1>{val.SkinName}</h1>
                <h1>{val.QualityName}</h1>
                <h1>{val.RarityName}</h1>
                <h1>{val.ItemPrice} Tokens</h1>
                <h1>{100-(Math.round(((val.ItemPrice/InventorySelect.ItemPrice)*100)-100))}% Success</h1>
              </div>
            ))}
            </div>


          </div>
        </div>
        
      </div>
    );
  }
  