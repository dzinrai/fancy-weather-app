import React from 'react';
import {cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Search from '../Search';

afterEach(cleanup);

test('proper search container', () => {
    const tree = renderer.create(<Search 
        text={'Search city'}
        btnText={'Search'}
        error={false}
        listening={true}
        supported={true}
        hideTips={true}
    />).toJSON();
    expect(tree).toMatchSnapshot();
})

test('proper search container', () => {
    const tree = renderer.create(<Search 
        text={'Search city'}
        btnText={'Search'}
        error={true}
        listening={true}
        supported={true}
        hideTips={true}
    />).toJSON();
    expect(tree).toMatchSnapshot();
})

test('proper search container', () => {
    const tree = renderer.create(<Search 
        text={'Search city'}
        btnText={'Search'}
        error={true}
        listening={false}
        supported={true}
        hideTips={true}
    />).toJSON();
    expect(tree).toMatchSnapshot();
})

test('proper search container', () => {
    const tree = renderer.create(<Search 
        text={'Search city'}
        btnText={'Search'}
        error={false}
        listening={false}
        supported={false}
        hideTips={true}
    />).toJSON();
    expect(tree).toMatchSnapshot();
})
