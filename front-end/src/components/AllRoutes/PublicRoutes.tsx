import { Navigate } from "react-router-dom"

const PublicRoutes = ({ children }: { children: JSX.Element }) => {
    if (!localStorage.getItem('_token_')) {
        return <Navigate to="/" />
    }

    return children
}
export default PublicRoutes