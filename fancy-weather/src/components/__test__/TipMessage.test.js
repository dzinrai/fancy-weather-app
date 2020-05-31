import React from 'react';
import {cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';
import TipMessage from '../TipMessage';

afterEach(cleanup);

test('proper message', () => {
    const tree = renderer.create(<TipMessage message={null} />).toJSON();
    expect(tree).toMatchSnapshot();
})

test('proper message', () => {
    const tree = renderer.create(<TipMessage message={{listening: false}} />).toJSON();
    expect(tree).toMatchSnapshot();
})

test('proper message', () => {
    const tree = renderer.create(<TipMessage message={{listening: true}} />).toJSON();
    expect(tree).toMatchSnapshot();
})