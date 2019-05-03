import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Table from './index';
import { usersList, finalAppState } from '../../utils/testData';

const mockStore = configureStore();

describe('Table', () => {
    it('"users" should be rendered correctly if it has child table', () => {
        const store = mockStore(finalAppState);
        const component = renderer.create(
            // @ts-ignore
            <Table tableName="users" store={store} />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('"users" should be rendered correctly if it doesn`t have child table', () => {
        const usersWithoutChildren = {
            tableData: {
                users: usersList,
                relatives: {},
                phones: {},
            },
        };
        const store = mockStore(usersWithoutChildren);
        const component = renderer.create(
            // @ts-ignore
            <Table tableName="users" store={store} />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('"relatives" should be rendered correctly', () => {
        const store = mockStore(finalAppState);
        const component = renderer.create(
            // @ts-ignore
            <Table tableName="relatives" id="34" store={store} />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('"phones" should be rendered correctly', () => {
        const store = mockStore(finalAppState);
        const component = renderer.create(
            // @ts-ignore
            <Table tableName="phones" id="1007" store={store} />,
        );
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('should show the child table after clicking on the parent row', async () => {
        const store = mockStore(finalAppState);
        const wrapper = mount(
            <Provider store={store}><Table tableName="users" /></Provider>,
        );
        expect(wrapper.find('.dataTable')).toHaveLength(1);
        await wrapper.find('td.arrow').at(0).simulate('click');
        expect(wrapper.find('.dataTable')).toHaveLength(2);
    });

    it('should hide the child table after clicking on the parent row second time', async () => {
        const store = mockStore(finalAppState);
        const wrapper = mount(
            <Provider store={store}><Table tableName="users" /></Provider>,
        );
        await wrapper.find('td.arrow').at(0).simulate('click');
        expect(wrapper.find('.dataTable')).toHaveLength(2);
        await wrapper.find('td.arrow').at(0).simulate('click');
        expect(wrapper.find('.dataTable')).toHaveLength(1);
    });

    it('should remove the table after clicking on the remove button', async () => {
        const store = mockStore(finalAppState);
        const wrapper = mount(
            <Provider store={store}><Table tableName="users" /></Provider>,
        );
        expect(wrapper.find('.dataTable')).toHaveLength(1);
        await wrapper.find('.removeButton').at(0).simulate('click');
        expect(store.getActions()).toMatchSnapshot();
    });

    it('should remove the child table after clicking on the child remove button', async () => {
        const store = mockStore(finalAppState);
        const wrapper = mount(
            <Provider store={store}><Table tableName="users" /></Provider>,
        );
        expect(wrapper.find('.dataTable')).toHaveLength(1);
        await wrapper.find('td.arrow').at(0).simulate('click');
        expect(wrapper.find('.dataTable')).toHaveLength(2);
        await wrapper.find('.removeButton').at(1).simulate('click');
        expect(store.getActions()).toMatchSnapshot();
    });
});
