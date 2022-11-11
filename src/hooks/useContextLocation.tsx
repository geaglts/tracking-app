import { createContext, useContext } from 'react';
import useInitialState, { IContext } from './useInitialState';

export interface ProviderContextLocationProps {
    children: React.ReactNode;
}

export const ContextLocation = createContext<IContext>({ addLocation: () => {}, state: { locations: [] } });

export const useTracking = () => {
    return useContext(ContextLocation);
};

export const ProviderContextLocation = ({ children }: ProviderContextLocationProps) => {
    const initialState = useInitialState();

    return <ContextLocation.Provider value={initialState}>{children}</ContextLocation.Provider>;
};
