
const cvReducer = (state = {},action)=>{

    switch (action.type){
        case "ADD_CV":
            return{
                ...state,cv:action.cv
            }

            default:
                    return state
    }
}

export default cvReducer