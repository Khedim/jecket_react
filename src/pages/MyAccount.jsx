import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeToken } from "../states/cartSlicer"

export const MyAcount = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        dispatch(removeToken())
        navigate("/")
    }
    return <div className="container pt-5 pb-0">
        <h1>My Account</h1>
        <div className="btn btn-danger mt-3" onClick={logout}>Log out</div>
    </div>
}