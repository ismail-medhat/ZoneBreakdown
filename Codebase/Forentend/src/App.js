import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Agents from "./views/admin/agent/Agents";
import AdminLogin from "./views/admin/AdminLogin";
import Navbar from "./views/Navbar";
import CreateAgent from "./views/admin/agent/CreateAgent";
import UpdateAgent from "./views/admin/agent/UpdateAgent";
import CreateCounty from "./views/admin/counties/CreateCounty";
import UpdateCounty from "./views/admin/counties/UpdateCounty";
import CountiesView from "./views/admin/counties/CountiesView";
import ZoneView from "./views/admin/zones/ZoneView";
import CreateZone from "./views/admin/zones/CreateZone";
import UpdateZone from "./views/admin/zones/UpdateZone";
import ISAView from "./views/ISAView";
import AgentView from "./views/AgentView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<ISAView />} />
          <Route path="/agent-view" element={<AgentView />} />
          <Route path="/admin" element={<AdminLogin />}></Route>
          <Route path="/admin/agents" element={<Agents />}></Route>
          <Route path="/admin/counties" element={<CountiesView />}></Route>
          <Route path="/admin/zones" element={<ZoneView />}></Route>
          <Route path="/admin/agents/create-agent" element={<CreateAgent />} />
          <Route
            path="/admin/agents/update-agent/:id"
            element={<UpdateAgent />}
          />
          <Route
            path="/admin/counties/create-county"
            element={<CreateCounty />}
          />
          <Route
            path="/admin/counties/update-county/:id"
            element={<UpdateCounty />}
          />
          <Route path="/admin/zones/create-zone" element={<CreateZone />} />
          <Route path="/admin/zones/update-zone/:id" element={<UpdateZone />} />
        
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
