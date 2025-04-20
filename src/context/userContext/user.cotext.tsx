import { createContext, useEffect, useReducer } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChangedListener } from '../../utils/firebase/firebase.utils';
import auth from '@react-native-firebase/auth';

type ActionType = {
    type: string,
    payoad: User | null,
};

type ContextProviderPropsType = {
    children: React.ReactNode,
};

type InitialStateType = {
    currentUser: User | null,
}

export const UserContext: React.Context<{
    currentUser: User | null,
    setCurrentUser: (user: User | null) => void,
}> = createContext<{
    currentUser: User | null,
    setCurrentUser: (user: User | null) => void,
}>({
    currentUser: null,
    setCurrentUser: () => { },
});


export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const INITIAL_STATE: InitialStateType = {
    currentUser: null,
};

const userReducer = (state: InitialStateType, action: ActionType) => {
    const { type, payoad } = action;

    switch (type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payoad,
            };
        default:
            throw new Error('unhandled type');
    }
};

function UserContextProvider({ children }: ContextProviderPropsType) {
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user: User | null) => {
        dispatch({ type: USER_ACTION_TYPE.SET_CURRENT_USER, payoad: user });
    };

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
