import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/UI/navbar/Navbar";
import {selectLoggedIn} from "./features/auth/authSlice";
import {useSelector} from "react-redux";

function App() {
    const isLoggedIn = useSelector(selectLoggedIn)

  return (
    <div className="App moving-background">
      <BrowserRouter>
          {isLoggedIn &&
            <Navbar/>
          }
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
