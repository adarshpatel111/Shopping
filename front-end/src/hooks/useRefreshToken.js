import axios from 'axios'
import signin from '../pages/SignIn/SignIn'
import { LOGINUSERTOKEN } from '../Utilities/ReduxConstants/SigninConstans'
import { useDispatch } from 'react-redux'
const useRefreshToken = () => {
    const dispatch = useDispatch()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const refresh = async () => {
        const response = await axios.get(`${backendUrl}/user/refresh`, {
            withCredentials: true
        })
        dispatch({ type: LOGINUSERTOKEN, payload: response.data.accessToken })
        return response.data.accessToken
    }
    return refresh;
}
export default useRefreshToken