import { Link } from "react-router-dom";

const adam = ["Database", "Legenda", "Dokumentace"];
const adam2 = ["E-Mail: veleadam226@gmail.com", "Class: 3B (2021/22)", "School: OAUH",  "..."]
const tomas = ["CSS", "Design", "JS", "Authors page"];
const tomas2 = ["E-Mail: thomas2654cz@gmail.com", "Class: 3B (2021/22)", "School: OAUH", "..."]

export default function About() {
  return (
    <div className="flex justify-center">
    <div className="bg-slate-800 rounded-cool text-white divide-y-2 w-3/5 p-3">
      <h1 className="text-4xl font-bold text-slate-200">
        Authors 🧑‍💻
      </h1>

      <div className="p-3 divide-y">
        <div className="pb-3">
          <h1 className="text-3xl font-bold text-slate-200">
            Adam Lukáš 😎🐺
          </h1>
          <div className="flex">
          {adam.map(item => (
                    <h1 key={item} className=" p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:text-orange-300 hover:bg-gray-700
                    transition-all" 
                    >
                      {item}
                    </h1>
          ))}
          </div>
          <div className="flex justify-items-stretch align-start">
          {adam2.map(item => (
                    <h1 key={item} className=" p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:text-orange-300 hover:bg-gray-700
                    transition-all" 
                    >
                      {item}
                    </h1>
          ))}
          </div>
        </div>

        <div className="pt-3">
          <h1 className="text-3xl font-bold text-slate-200">
            Tomáš Gabriel 🤪💵
          </h1>
          <div className="flex">
            {tomas.map(item => (
                    <h1 key={item} className="p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
                    hover:text-orange-300 hover:bg-gray-700
                    transition-all" 
                    >
                      {item}
                    </h1>
                    
            ))}
          </div>
          <div className="flex justify-items-stretch align-start">
          {tomas2.map(item => (
                    <h1 key={item} className=" p-1.5 px-2 m-2 box-content rounded-cool bg-slate-700 
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