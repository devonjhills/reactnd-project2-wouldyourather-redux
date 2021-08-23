/**
 * Mimic middleware functionality from reactnd Chirper App
 */
 const logging = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('The action: ', action);
    const returnValue = next(action);
    console.log('The new state: ', store.getState())
    console.groupEnd();
    return returnValue;
}

export default logging;