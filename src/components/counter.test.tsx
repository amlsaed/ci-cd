import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import Counter from './counter';

describe('Counter Component', () => {
  test('renders initial count', () => {
    render(<Counter />);
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  test('increments count', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('Increment'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });
    test('decrements count', () => {
      render(<Counter />);
      fireEvent.click(screen.getByText('Increment'));
      fireEvent.click(screen.getByText('Decrement'));
      expect(screen.getByTestId('count')).toHaveTextContent('0');
  });
});