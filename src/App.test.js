import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders Hello World text', () => {
  render(<App />);
  const textElement = screen.getByText(/hello world - version 1!/i);
  expect(textElement).toBeInTheDocument();
});