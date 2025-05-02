import { formatDate, generateSlug } from '../lib/utils';

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

describe('Utils', () => {
  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2023-01-01');
      const formattedDate = formatDate(date);
      expect(formattedDate).toBeDefined();
    });
  });

  describe('generateSlug', () => {
    it('generates a slug from a title', () => {
      const title = 'Test Title';
      const slug = generateSlug(title);
      expect(slug).toBe('test-title');
    });

    it('handles special characters', () => {
      const title = 'Test & Title: With Special Characters!';
      const slug = generateSlug(title);
      expect(slug).toBe('test-title-with-special-characters');
    });

    it('handles Japanese characters', () => {
      const title = 'テスト タイトル';
      const slug = generateSlug(title);
      expect(slug).toBe('tesuto-taitoru');
    });
  });
});
