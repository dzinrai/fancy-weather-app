import React from 'react';
import {render, cleanup, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import ErrorLog from '../ErrorLog';

afterEach(cleanup);

test('proper error', () => {
    const tree = renderer.create(<ErrorLog error={{statusText: 'Not Found'}} />).toJSON();
    expect(tree).toMatchSnapshot();
})

test('proper error', () => {
    const tree = renderer.create(<ErrorLog error={{statusText: 'Browser doesn\'t support voice enter'}} />).toJSON();
    expect(tree).toMatchSnapshot();
})
