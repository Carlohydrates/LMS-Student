import React, {
  FC,
  useReducer,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import {jwtDecode} from "jwt-decode";

interface AuthState {
  user: any;
  loading: boolean;
}

interface AuthAction {
  type: string;
  payload?: any;
}

interface AuthContextProps {
  user: any;
  loading: boolean;
  dispatch: React.Dispatch<AuthAction>;
}

interface DecodedJWT {
  _id: string;
  email: string;
  name: string;
  tier: number;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
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
    loading: true,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const user: string | null = localStorage.getItem("user");

      if (user) {
        try {
          const decodedUser: DecodedJWT = jwtDecode<DecodedJWT>(user)
          // console.log("DECODED USER:", decodedUser)
          const { name: username, email, _id, tier } = decodedUser;
          const userInfo = { _id, username, email, tier };
          dispatch({ type: "LOGIN", payload: userInfo });
        } catch (error) {
          console.error("Failed to decode token", error);
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "STOP_LOADING" });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

