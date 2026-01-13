
import { Navigate } from "react-router-dom";

const Private=({children})=>{
    const token=localStorage.getItem("token")
    if(!token){
        return <Navigate to="/Login"/>
    }
    return children;
}

export default Private