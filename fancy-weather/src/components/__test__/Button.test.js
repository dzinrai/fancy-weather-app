import React from 'react';
import {render, cleanup, screen} from '@testing-library/react';
import Button from './../Button';

afterEach(cleanup);

test('button have proper text', () => {
    const { getByTestId } = render(<Button testId='audio-play' tooltip={undefined} text='click!' />);
    expect(getByTestId('audio-play')).toHaveTextContent('click!');
})

test('button recives proper tooltip', () => {
    const { rerender } = render(<Button testId='audio-play' tooltip={{id: 'x1', text: 'text'}} text='click!' />);
    expect(screen.getByTestId('tooltip1-audio-play').textContent).toBe('text');
    rerender(<Button testId='audio-play' tooltip={{id: 'x1', text: 'new'}} text='click!' />);
    expect(screen.getByTestId('tooltip1-audio-play').textContent).toBe('new');
})