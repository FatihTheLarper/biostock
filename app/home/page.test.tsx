import { render, screen } from '@testing-library/react';

jest.mock('react-typed', () => {
  return { ReactTyped: ({ strings }: { strings: string[] }) => <span>{strings[0]}</span> };
});

jest.mock('./components/navbar/navbar', () => {
  return {
    __esModule: true, default: ({ items }: { items: { name: string; href: string }[] }) => (
      <nav>{items.map((item) => <a key={item.href} href={item.href}>{item.name}</a>)}</nav>
    )
  };
});

import Home from './page';

test('renders the welcome heading', () => {
  render(<Home />);
  expect(screen.getByText(/Welcome to BioStock/)).toBeInTheDocument();
});

test('has a Start Now link pointing to /mealprep', () => {
  render(<Home />);
  const startNow = screen.getByText(/Start Now/);
  expect(startNow).toHaveAttribute("href", "/mealprep");
});

test('has a Learn More link pointing to /about', () => {
  render(<Home />);
  const learnMore = screen.getByText(/About Biostock/);
  expect(learnMore).toHaveAttribute("href", "/about");
});
