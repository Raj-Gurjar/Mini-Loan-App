import { useContext } from "react";
import GlobalContext from "../Context/GlobalContext";
import Login from "./Log Pages/Login";


export default function ProtectedRoute({Component}) {

  const { isLoggedIn, userType} = useContext(GlobalContext);

  return (
    isLoggedIn ? <Component/> : <Login/>
  )
}
