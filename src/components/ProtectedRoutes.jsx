import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { LogIn } from "../pages/LogIn"

const useAuth = () => {
    const {isAuthenticated} = useSelector(state => state.cart)
    return isAuthenticated
}

export const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <LogIn />
}