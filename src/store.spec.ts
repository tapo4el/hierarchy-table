
import configureStore from './store';
import { response, finalAppState, initialAppState } from './utils/testData';

describe('Store', () => {
    it('should initialize store and fetch users data', async () => {
        const mockAPI = jest.fn(() => Promise.resolve(response));
        const mockStore = configureStore(mockAPI);
        expect(mockAPI).toHaveBeenCalled();
        expect(mockStore.getState()).toEqual(initialAppState);
        await mockAPI;
        expect(mockStore.getState()).toEqual(finalAppState);
    });
});
