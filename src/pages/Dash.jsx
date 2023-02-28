import { Link } from "react-router-dom"

export const Dash = () => {
    return <div className="d-flex " style={{height: "100vh"}}>
        <sidebar className="bg-dark text-light p-5">
            sidebar
        </sidebar>
        <div className="p-5">
            content
            <Link to="/" className="btn btn-success">site</Link>
        </div>
    </div>
}