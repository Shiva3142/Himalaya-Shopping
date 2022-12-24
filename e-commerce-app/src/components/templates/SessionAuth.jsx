let initialState={
    user:true,
    username:null,
}
function reducer(state,action) {
    if (action.type==="LOGIN") {
        return({
            user:action.user,
            username:action.username
        })}
        else if(action.type==="LOGOUT")
        {
            return({
                user:action.user,
                username:action.username
            })
        }
    return state;
}

export default reducer
export {initialState}