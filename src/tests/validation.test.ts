import { describe, it, expect } from 'vitest';
import { validationBirth } from '../utils/validations/validationsComponents';
import { calculateAge } from '../utils/ageAndTextChecks';

describe('calculateAge', () => {
  it('returns correct age for a given date', () => {
    const age = calculateAge(new Date('2000-01-01'));
    expect(age).toBe(24);
  });
});

describe('validationBirth', () => {

  it('returns true if the date matches the format', () => {
    const result = validationBirth('12.05.2024');
    expect(result).toBe(true);
  });

  it('returns true if the date is in correct format (dd.mm.yyyy)', () => {
    const result = validationBirth('12.05.2024');
    expect(result).toBe(true);
  });
});
