import { createReducer , on } from "@ngrx/store";
import { AuthState } from "../../models/userModel";
import { AuthActions } from "./auth.actions";

const initialState:AuthState={
    user: null,
    token: null,
    loading: false,
    error: null
}

export const authReducer = createReducer(
    initialState,
    on(AuthActions.login,(state)=>({...state,loading:true,error:null})),
    on(AuthActions.loginSuccess,(state,{user,token})=>({...state,user,token,loading:false,error:null})),
    on(AuthActions.restoreSession, (state, { user, token }) => ({...state,user,token,loading: false,error: null})),
    on(AuthActions.loginFailure,(state,{error})=>({...state,user:null,token:null,loading:false,error})),
    on(AuthActions.logout,()=>initialState)
);

