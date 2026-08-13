import { render, screen } from '@testing-library/react';
import Home from './page';

test('renders the main heading', () => {
  render(<Home />);
  expect(screen.getByRole('heading')).toBeInTheDocument();
});
