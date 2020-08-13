const logger = store => next => action => {
    if (process.env.NODE_ENV === 'development') {
        console.group(action.type);
        console.log('The action:', action);
        const returnValue = next(action);
        console.log('The new state: ', store.getState());
        console.groupEnd();
        return returnValue;
    } else {
        const returnValue = next(action);
        return returnValue;
    }
};

export default logger;
