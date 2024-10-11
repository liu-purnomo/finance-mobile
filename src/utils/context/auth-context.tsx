import { UserSchema } from '@/database/schemas';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { useAuthentication } from '../hooks/useAuthentication';

// Define the shape of the user data
// Define the shape of the context
interface AuthContextType {
  userData: UserSchema;
  setUserData: Dispatch<SetStateAction<UserSchema>>;
}

// Create the context
const init: AuthContextType = {
  userData: {
    id: '',
    name: '',
    email: '',
    token: '',
  },
  setUserData: () => {},
};

// Create the context with the initial state
export const AuthContext = createContext<AuthContextType>(init);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

// Create a provider to wrap the app and provide the context
export const AuthContextProvider = (props: React.PropsWithChildren) => {
  // check if user exists
  const { user } = useAuthentication();

  React.useEffect(() => {
    if (user) {
      setUserData(user as any);
    }
  }, [user]);

  const [userData, setUserData] = useState<UserSchema>({
    id: '',
    name: '',
    email: '',
    token: '',
  });

  const contextValue = {
    userData,
    setUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to easily access the context
export const useAuthContext = () => useContext(AuthContext);
