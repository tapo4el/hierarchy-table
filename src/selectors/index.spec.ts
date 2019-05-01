import {
    getPhones,
    getRelatives,
    getUsers,
    getChildren,
} from './index';
import {
    usersList,
    relativesList,
    phonesList,
    finalAppState,
} from '../utils/testData';

describe('Selectors', () => {
    it('getUsers should work correctly', () => {
        expect(getUsers(finalAppState, null)).toEqual(usersList);
    });

    it('getRelatives should work correctly', () => {
        expect(getRelatives(finalAppState, '34')).toEqual(relativesList);
    });

    it('getPhones should work correctly', () => {
        expect(getPhones(finalAppState, '1007')).toEqual(phonesList);
    });

    it('getChildren should work correctly', () => {
        expect(getChildren(finalAppState, 'relatives')).toEqual(['34']);
    });
});
