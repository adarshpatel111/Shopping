import { LOGINDATA, LOGINUSERDATA, LOGINUSERTOKEN } from "../../Utilities/ReduxConstants/SigninConstans"

const initState = {
    login: false,
    user: [],
    access_token: null,
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case LOGINDATA:
            console.log("payload", action.payload)
            return { ...state, login: action.payload }
        case LOGINUSERDATA:
            return { ...state, user: action.payload }
        case LOGINUSERTOKEN:
            console.log("User tOKEN payload", action.payload)
            return { ...state, token: action.payload }
        default:
            return state
    }
}