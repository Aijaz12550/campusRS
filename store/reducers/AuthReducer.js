
const AuthReducer = ( state = {}, action) => {

    switch(action.type){

        case "ADD_USER" :
            return{
                ...state, user:action.user
            }

            case "REMOVE_USER" :
                return {
                    user:null,
                }

                default:
                    return state
                    
    }

}

export default AuthReducer