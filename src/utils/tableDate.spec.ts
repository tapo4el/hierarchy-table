import normalizeData from './tableData';

import { response, finalAppState } from './testData';

describe('tableData utils', () => {
    it('normalizeData should add user, relatives and phones', () => {
        expect(normalizeData(response)).toEqual(finalAppState.tableData);
    });
});
