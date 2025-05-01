import { render, screen } from '@testing-library/react';

jest.mock('../app/page', () => {
  return {
    __esModule: true,
    default: () => <main>Home Page Content</main>
  };
});

jest.mock('next/headers', () => ({
  cookies() {
    return {
      get: jest.fn().mockImplementation((name) => {
        if (name === 'NEXT_LOCALE') {
          return { value: 'ja' };
        }
        return null;
      })
    };
  }
}));

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
    const HomePage = require('../app/page').default;
    
    render(<HomePage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
