import { render, screen } from '@testing-library/react';
import { EventList } from '../../components/EventList';

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

const mockEvents = [
  {
    slug: 'test-event-1',
    title: 'Test Event 1',
    date: new Date('2023-01-01'),
    location: 'Tokyo',
    description: 'Test description 1',
    speakers: [],
    tags: ['test'],
    coverImage: '/images/test.jpg',
  },
  {
    slug: 'test-event-2',
    title: 'Test Event 2',
    date: new Date('2023-02-01'),
    location: 'Osaka',
    description: 'Test description 2',
    speakers: [],
    tags: ['test'],
    coverImage: '/images/test.jpg',
  },
];

describe('EventList', () => {
  it('renders the event list component', () => {
    render(<EventList events={mockEvents} />);
    expect(screen.getByText(/Test Event 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Event 2/i)).toBeInTheDocument();
  });

  it('renders empty state when no events are provided', () => {
    render(<EventList events={[]} />);
    expect(screen.getByText(/No events found/i)).toBeInTheDocument();
  });
});
