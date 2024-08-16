import { LOGINDATA, LOGINUSERDATA, LOGINUSERTOKEN } from "../../Utilities/ReduxConstants/SigninConstans"

const initState = {
    login: false,
    user: [],
    token: null,
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case LOGINDATA:
            return { ...state, login: action.payload }
        case LOGINUSERDATA:
            return { ...state, user: action.payload }
        case LOGINUSERTOKEN:
            return { ...state, token: action.payload }
        default:
            return state
    }
}