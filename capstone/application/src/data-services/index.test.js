import { bagKeys } from '.'

test('bagKeys returns valid total key', () => {
    expect(bagKeys('01-Apr').totalKey).toBe('01-Apr-total');
});
