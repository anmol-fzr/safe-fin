import { authClient } from "@/utils/auth"
import { type Instance, type SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authState: "login" // register, complete
  })
  .views((store) => ({
    get isAuthenticated() {
      return store.authState === "complete"
    },
    get currAuthState() {
      return store.authState
    },
  }))
  .actions((store) => ({
    setAuthState(val: "login" | "register" | "complete") {
      store.authState = val
    },
    logout() {
      console.info("Logout")
      authClient.signOut()
      store.authState = "login"
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }
