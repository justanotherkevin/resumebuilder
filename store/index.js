import { configureStore } from '@reduxjs/toolkit';
import resumeSlice from './slices/resumeSlice';

const loadState = () => {
    console.info('Loading State from Local Storage...');

    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) return undefined;
        console.info('State Loaded Successfully from Local Storage');
        return JSON.parse(serializedState);
    } catch (err) {
        console.warn('Error Loading State from Local Storage');
        return undefined;
    }
};

const store = configureStore({
    devTools: true,
    preloadedState: loadState(),
    reducer: {
        resume: resumeSlice,
    },
});
const DEFAULT_DEBOUNCE_DELAY = 500;
function debounce(func, timeout = DEFAULT_DEBOUNCE_DELAY) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

const saveState = debounce(() => {
    console.info('Saving State to Local Storage...');
    // localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});
// // store.subscribe() is a method that allows you to register a callback function that will be executed every time an action is dispatched and the state tree is updated. 
// // So, saveState is called because it's subscribed to the store's updates.
store.subscribe(saveState);

export default store;
