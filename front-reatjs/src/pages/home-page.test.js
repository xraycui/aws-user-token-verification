import { render, screen } from '@testing-library/react';
import HOME from './home-page.jsx';

describ('HOME page', () => {
  test('renders learn react link', () => {
    render(<HOME />);
    const linkElement = screen.getByText('Welcome to the Home Page');
    expect(linkElement).toEqual('Welcome to the Home Page');
  });
})