import { useEffect } from "react"

export const Success = () => {
    useEffect(() => {
        document.title = "Success | Jacket"
    }, [])

    return <div className="container pt-5">
        <h1>Thank you</h1>
        <p>Your order will be proccessed within 48 hours</p>
    </div>
}