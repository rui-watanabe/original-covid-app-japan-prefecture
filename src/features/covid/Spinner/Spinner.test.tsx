import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('PieChart rendering test', () => {
  it('Should render all the elements correctly', () => {
    render(<Spinner />);
    expect(screen.getByRole('progressbar')).toBeTruthy();
  });
});