import { createContext } from "react";
import { defaultUser } from "./API/userApi";

const UserContext = createContext(defaultUser);

export default UserContext;
