import { Link } from "react-router-dom";

const adam = ["Database", "Legenda", "Dokumentace"];
const adam2 = ["E-Mail: veleadam226@gmail.com", "Class: 3B (2021/22)", "School: OAUH",  "..."]
const tomas = ["CSS", "Design", "JS", "Authors page"];
const tomas2 = ["E-Mail: thomas2654cz@gmail.com", "Class: 3B (2021/22)", "School: OAUH", "..."]

export default function App() {
  return (
    <div class="flex justify-center align-bottom">
    <div class="bg-slate-800 rounded-cool text-white divide-y-2 w-3/5 p-3">
      <h1 className="text-4xl font-bold text-slate-200">
        Authors 🧑‍💻
      </h1>

      <div class="p-3 divide-y">
        <div class="pb-3">
          <h1 className="text-3xl font-bold text-slate-200">
            Adam Lukáš 😎🐺
          </h1>
          <div class="flex">
          {adam.map(item => (
                    <h1 class=" p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:text-orange-300 hover:bg-gray-700
                    transition-all" 
                    >
                      {item}
                    </h1>
          ))}
          </div>
          <div class="flex justify-items-stretch align-start">
          {adam2.map(item => (
                    <h1 class=" p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:text-orange-300 hover:bg-gray-700
                    transition-all" 
                    >
                      {item}
                    </h1>
          ))}
          </div>
        </div>

        <div class="pt-3">
          <h1 className="text-3xl font-bold text-slate-200">
            Tomáš Gabriel 🤪💵
          </h1>
          <div class="flex">
            {tomas.map(item => (
                    <h1 class="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:text-orange-300 hover:bg-gray-700
                    transition-all" 
                    >
                      {item}
                    </h1>
                    
            ))}
          </div>
          <div class="flex justify-items-stretch align-start">
          {adam2.map(item => (
                    <h1 class=" p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:text-orange-300 hover:bg-gray-700
                    transition-all" 
                    >
                      {item}
                    </h1>
          ))}
          </div>
        </div>
      </div>

    </div>
    </div>
  );
}