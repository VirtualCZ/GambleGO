import {useEffect, useState, useContext} from "react"
import {useLocation} from 'react-router-dom'
import Axios from "axios";
import { AppContext } from "/src/App";

export default function CaseDetail(){

    const params = useLocation();
    const route = params.pathname
    const caseID = route.replace("/case_detail/", "");
    const [ContentList, setContentList] = useState([])
    const [Case, setCase] = useState([])
    const [ShowDrop, setShowDrop] = useState(false)
    const [DroppedItem, setDroppedItem] = useState()

    const { token } = useContext(AppContext);
    const { setToken } = useContext(AppContext);
    const { userID } = useContext(AppContext);

    const submitItem = (idItem) => {
      Axios.post("http://localhost:3030/api/insertItem", {
      idItem: idItem,
      userID: userID
      })
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

    const DropWindow = () => {
      setShowDrop(!ShowDrop)
    }

    const SpecialList = ContentList.filter(function(driver){
      return driver.RarityName === "Special"})

    const CovertList = ContentList.filter(function(driver){
      return driver.RarityName === "Covert"})

    const ClassifiedList = ContentList.filter(function(driver){
      return driver.RarityName === "Classified"})

    const RestrictedList = ContentList.filter(function(driver){
      return driver.RarityName === "Restricted"})

    const MilSpecList = ContentList.filter(function(driver){
      return driver.RarityName === "Mil-Spec"})
    
    const openCase = (CasePrice) => {
      const Price = parseInt(CasePrice)
      if (token >= Price){
        setToken(token-Price)
        sendTokens(token-Price)
        const randomNumero = Math.random()* 100;
        if(randomNumero <= 70)
        {
          const millength = MilSpecList.length
          const randomItemM = Math.floor(Math.random() * millength)
          submitItem(MilSpecList[randomItemM].IDItem)
          setDroppedItem(MilSpecList[randomItemM])
          setShowDrop(!ShowDrop)
          console.log("Milspec")
        }
        else if(randomNumero >= 70 && randomNumero <= 94)
        {
          const restlength = RestrictedList.length
          const randomItemR = Math.floor(Math.random() * restlength)
          submitItem(RestrictedList[randomItemR].IDItem) //velký špatný here
          setDroppedItem(RestrictedList[randomItemR])
          setShowDrop(!ShowDrop)
          console.log("Restricted")
        }
        else if (randomNumero >= 94 && randomNumero <= 98)
        {
          const classlength = ClassifiedList.length
          const randomItemCl = Math.floor(Math.random() * classlength)
          submitItem(ClassifiedList[randomItemCl].IDItem)
          setDroppedItem(ClassifiedList[randomItemCl])
          setShowDrop(!ShowDrop)
          console.log("Classified")
        }
        else if (randomNumero >= 98 && randomNumero <= 99.5)
        {
          const covertlength = CovertList.length
          const randomItemCo = Math.floor(Math.random() * covertlength)
          submitItem(CovertList[randomItemCo].IDItem)
          setDroppedItem(CovertList[randomItemCo])
          setShowDrop(!ShowDrop)
          console.log("Covert")
        }
        else if (randomNumero >= 99.5 && randomNumero <= 100)
        {
          const speciallength = SpecialList.length
          const randomItemS = Math.floor(Math.random() * (speciallength - 0)+ 0)
          submitItem(SpecialList[randomItemS].IDItem)
          setDroppedItem(SpecialList[randomItemS])
          setShowDrop(!ShowDrop)
          console.log("Special")
        }
      }else{console.log("No funds")}
    }

    useEffect(() => {
        Axios.get(`http://localhost:3030/api/getCase/${caseID}`).then((response)=> {
          setCase(response.data);
        })
      }, [])

      useEffect(() => {
        Axios.get(`http://localhost:3030/api/getCaseContent/${caseID}`).then((response)=> {
          setContentList(response.data);
        })
      }, [])

    return(
          <div className="flex justify-center align-bottom">
            {ShowDrop && <div className=" absolute">
              
              <div className=" border-2 border-slate-500 w-[30rem] h-auto p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 text-white  ">
                <img className=" block mx-auto" src={`src/images/skins/${DroppedItem.SkinImage}`}/>
                <h1 className="flex justify-center hover:text-orange-300">{DroppedItem.SkinName}</h1>
                  <h1 className="flex justify-center hover:text-orange-300">
                  {DroppedItem.QualityName}
                  </h1>
                  <h1 className=" flex justify-center hover:text-orange-300">
                  {DroppedItem.RarityName}
                  </h1>
                  <h1 className="flex justify-center hover:text-orange-300">
                  {DroppedItem.ItemPrice} Tokens
                  </h1>
                <button
                  className=' border-2 border-green-700 bg-green-400 hover:bg-green-600 text-green-900 hover:text-rose-50 w-[100%] h-10 rounded-cool my-2 transition-all' 
                  onClick={()=>{DropWindow()}}
                >
                  Close
                </button>
              </div>
          
            </div>
            }
                <div className="bg-slate-800 rounded-cool text-white divide-y-2 w-3/5 p-3">
                {Case.map(item => (
                  <h1 key={item.CaseName} className="text-4xl font-bold text-slate-200 py-2" >
                    {item.CaseName} 💼
                  </h1>
                  ))}
                  {Case.map(item => (
                  <div key={item.CaseName} className="flex justify-center p-3 mt-2">
                    
                    <div className=" w-[50%] p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 " 
                    >
                      <div className="flex justify-center">
                        <img className="" src={`src/images/${item.CaseImage}`}/>
                      </div>
                      <h1 className="hover:text-orange-300">
                        {item.CaseName}
                      </h1>
                        <h1 className="hover:text-orange-300 basis-1/2">
                          {item.CasePrice} Tokens
                        </h1>
                        <div className=" flex justify-center">
                          <button className=" cursor-pointer text-xl text-slate-900 w-40 h-10 hover:text-orange-300 hover:bg-slate-600 hover:border-2 hover:border-white-200 bg-orange-300 rounded-cool px-2 py-0.25 transition-all"
                          onClick={() => {openCase(item.CasePrice)}}
                          >
                            OPEN
                          </button>
                        </div>
                    </div>
                  </div>
                  ))}
                  <div>
                  <h1 className="text-4xl font-bold text-slate-200 py-2" >
                    Content 🔫
                  </h1>
                  <div className="grid-cols-5 grid p-3 mt-2">
                    {ContentList.map(item => (
                            <div key={item.IDItem} className=" cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                            hover:bg-gray-700 hover:border-2 hover:m-0.5 hover:px-3 hover:border-white-200 transition-all" 
                            >
                              <img className="" src={`src/images/skins/${item.SkinImage}`}/>
                              <h1 className="hover:text-orange-300">
                              {item.SkinName}
                              </h1>
                                <h1 className="hover:text-orange-300 basis-1/2">
                                {item.QualityName}
                                </h1>
                                <h1 className="hover:text-orange-300 basis-1/2">
                                {item.RarityName}
                                </h1>
                                <h1 className="hover:text-orange-300 basis-1/2">
                                {item.ItemPrice} Tokens
                                </h1>
                               
                            </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>
    )
}