
const Add_User = (user)=>{
    return{
        type:'ADD_USER',
        user:user
    }
}

const Remove_User = ()=>{
    return{
        type:'REMOVE_USER'
    }
}

export { Add_User, Remove_User }