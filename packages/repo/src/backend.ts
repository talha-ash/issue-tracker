import * as auth from "./context/auth"

export const backendRepo = {
    auth: {
        signIn: auth.signIn,
        signOut: auth.signOut
    }
}
