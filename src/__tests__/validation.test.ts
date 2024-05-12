import { calculateAge } from '../utils/ageAndTextChecks';
import { nameValidation, validationBirth } from '../utils/validations/validationsComponents';


describe('nameValidation', () => {
  test('returns false if the name is empty', () => {
    const result = nameValidation('');
    expect(result).toBe(false);
  });

  test('returns false if the name is too short', () => {
    const result = nameValidation('a');
    expect(result).toBe(false);
  });

  test('returns false if the name contains non-English letters', () => {
    const result = nameValidation('123');
    expect(result).toBe(false);
  });

  test('returns true if the name is valid', () => {
    const result = nameValidation('John');
    expect(result).toBe(true);
  });
});

describe('calculateAge', () => {
  test('returns correct age for a given date', () => {
    const age = calculateAge(new Date('2000-01-01'));
    expect(age).toBe(24);
  });
});

describe('validationBirth', () => {
  test('returns false if the date does not match the format', () => {
    const result = validationBirth('2024-05-12');
    expect(result).toBe(false);
  });

  test('returns true if the date matches the format', () => {
    const result = validationBirth('12.05.2024');
    expect(result).toBe(true);
  });

  test('returns true if the date is in correct format (dd.mm.yyyy)', () => {
    const result = validationBirth('12.05.2024');
    expect(result).toBe(true);
  });
});
