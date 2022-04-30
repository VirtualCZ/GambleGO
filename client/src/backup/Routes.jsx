//import jednotlivých dílů stránky
import App from "./App";
import Cases from "./routes/cases";
import Upgrader from "./routes/upgrader";
import Contracts from "./routes/contracts";
import Inventory from "./routes/inventory";
import Cases_old from "./routes/cases_old";
import Navbar from "./navbar"
import Accounts from "./routes/accounts"
import CaseDetail from "./routes/caseDetail"
import NotFound from "./notfound"

export default function Routes () {
    return(
        <section>
        <Route path="/" element={<App />} />
        <Route path="cases" element={<Cases />} />
        <Route path="upgrader" element={<Upgrader />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="cases_old" element={<Cases_old />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="case_detail" element={<CaseDetail />}/>
        <Route path="*" element={<NotFound />}/>
        </section>
    )
}