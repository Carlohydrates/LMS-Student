/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import React, {
  FC,
  useReducer,
  createContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthState {
  user: any;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextProps {
  user: any;
  dispatch: React.Dispatch<AuthAction>;
}

interface decodedJWT {
  email: string;
  name: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user: string | null = localStorage.getItem("user") || null;

    if (user) {
      console.log("User: ", user);
      const decodedUser: decodedJWT = jwtDecode<decodedJWT>(user!);
      console.log("Decoded User: ", decodedUser);
      const { name: username, email } = decodedUser;
      const userInfo = { username, email };
      dispatch({ type: "LOGIN", payload: userInfo });
    }
  }, []);

  console.log("Auth Context State: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
