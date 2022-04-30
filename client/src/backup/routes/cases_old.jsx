import { Link } from "react-router-dom";
import tokens from "../navbar"
import React, { useState } from 'react';
//generate a rarity based on %, then generate random object based on the rarity generated, then generate the item wear (based on the wears the item can have)
const cases_list = [
  { img: "src/images/chroma.webp", name: "Chroma Case", price: 150},
  { img: "src/images/chroma2.webp", name: "Chroma 2 Case", price: 150},
  { img: 'src/images/chroma3.webp', name: "Chroma 3 Case", price: 200},
  { img: 'src/images/clutch.webp', name: "Clutch Case", price: 500},
  { img: 'src/images/cs20.webp', name: "CS20 Case", price: 200},
  { img: 'src/images/dangerzone.webp', name: "Danger Zone Case", price: 200},
  { img: 'src/images/dnn.webp', name: "Dreams & Nightmares", price: 200},
  { img: 'src/images/fracture.webp', name: "Fracture Case", price: 200},
  { img: 'src/images/gamma.webp', name: "Gamma Case", price: 200},
  { img: 'src/images/gamma.webp', name: "Gamma 2 Case", price: 200},
  { img: 'src/images/glove.webp', name: "Glove Case", price: 200},
  { img: 'src/images/horizon.webp', name: "Horizon Case", price: 200},
  { img: 'src/images/huntsman.webp', name: "Huntsman Case", price: 150},
  { img: 'src/images/phoenix.webp', name: "Operation Phoenix Case", price: 150},
  { img: 'src/images/riptide.webp', name: "Operation Riptide Case", price: 200},
  { img: 'src/images/prisma.webp', name: "Prisma Case", price: 200},
  { img: 'src/images/prisma2.webp', name: "Prisma 2 Case", price: 150},
  { img: 'src/images/revolver.webp', name: "Revolver Case", price: 150},
  { img: 'src/images/shadow.webp', name: "Shadow Case", price: 150},
  { img: 'src/images/shattered_web.webp', name: "Shattered Web Case", price: 150},
]

export default function Cases_old() {
  return (
    <div class="flex justify-center align-bottom">
      <div class="bg-slate-800 rounded-cool text-white divide-y-2 w-3/5 p-3">
        <h1 className="text-4xl font-bold text-slate-200 py-2" >
          Cases 💼
        </h1>
        <div class="grid-cols-5 grid p-3 mt-2">
          {cases_list.map(item => (
                  <div class=" cursor-pointer p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                  hover:bg-gray-700 hover:m-0.5 hover:border-2 hover:border-white-200
                  transition-all" >
                    <img class="" src={item.img} alt={item.img}/>
                    <h1 class="hover:text-orange-300">
                      {item.name}
                    </h1>
                    <div class="flex flex-col-2">
                      <h1 class="hover:text-orange-300 flex basis-1/2">
                        {item.price} Tokens
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