import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      pathname: '/',
      locale: 'ja',
    };
  },
}));

describe('HomePage', () => {
  it('renders the homepage without crashing', () => {
    render(<HomePage />);
    
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
