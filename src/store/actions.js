// eslint-disable-next-line import/prefer-default-export,arrow-body-style
export const fireTickerUpdate = ({ state }) => Promise.all(state.tickerListener.map((listener) => {
    return new Promise((resolve) => {
        listener();
        resolve();
    });
}));
