import { useState } from 'react';

export interface ILocation {
    latitude: number;
    longitude: number;
}

export interface IState {
    locations: Array<ILocation>;
}

const initalState: IState = {
    locations: [],
};

export interface IContext {
    state: IState;
    addLocation: (location: ILocation) => void;
}

export default function useInitialState(): IContext {
    const [state, setState] = useState(initalState);

    const addLocation = (location: ILocation) => {
        setState({ ...state, locations: [...state.locations, location] });
    };

    return { state, addLocation };
}
