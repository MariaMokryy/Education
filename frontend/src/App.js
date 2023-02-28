import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/navbar/Navbar";
import {selectLoggedIn, selectUserData} from "./features/auth/authSlice";
import {useSelector} from "react-redux";
import SupervisorNavbar from "./components/UI/navbar/SupervisorNavbar";

function App() {
    const isLoggedIn = useSelector(selectLoggedIn)
    const role = useSelector(selectUserData).role

  return (
    <div className="App moving-background">
      <BrowserRouter>
          {isLoggedIn &&
                ["supervisor", "admin"].includes(role) ?
              <SupervisorNavbar/> :
              <Navbar/>
          }
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
