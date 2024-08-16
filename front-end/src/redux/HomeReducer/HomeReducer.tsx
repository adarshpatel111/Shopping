import { HOMEDATA } from "../../Utilities/ReduxConstants/HomeConstans"

const initState = {
    data: [],
}
export default (state = initState, action: any) => {
    switch (action.type) {
        case HOMEDATA:
            return { ...state, data: action.payload }
        default:
            return state
    }
}