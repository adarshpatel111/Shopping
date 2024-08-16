import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to="/" />
    }
    return children
}
export default ProtectedRoutes