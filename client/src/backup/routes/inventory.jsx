import Axios from 'axios'
import { useState, useEffect } from "react";
export default function Inventory() {
  
  const [Inventory, setInventory] = useState([])


  useEffect(() => {
    Axios.get('http://localhost:3030/api/getInventory3').then((response)=> {
      setInventory(response.data);
    })
  }, [])  

  console.log(Inventory)

  return (
      <main className="text-xl font-bold text-slate-200">
        <h2 className="text-3xl font-bold text-slate-200">Inventory 🎒</h2>        
                  <table className=''>
                    <tr>
                      <th>Skin name</th>
                      <th>Grade</th>
                      <th>Wear</th>
                      <th>Collection</th>
                      <th>Price</th>
                      <th>Amount</th>
                    </tr>
                    {Inventory.map(item => (
                      <tr>
                        <td className='px-2'>{item.SkinName}</td>
                        <td className='px-2'>{item.RarityName}</td>
                        <td className='px-2'>{item.QualityName}</td>
                        <td className='px-2'>{item.CaseName}</td>
                        <td className='px-2'>{item.ItemPrice}</td>
                        <td className='px-2'>{item.Amount}</td>
                      </tr>
                    ))}
                  </table> 

      </main>
    );
  }