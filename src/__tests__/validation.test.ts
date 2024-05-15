import { calculateAge } from '../utils/ageAndTextChecks';
import {
  nameValidation,
  validationBirth,
  passwordValidation,
} from '../utils/validations/validationsComponents';

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

const ERROR_MESSAGES = {
  passwordNoSpaces: 'Password should not contain spaces.',
  atLeast8Characters: 'Password should be at least 8 characters long.',
  passwordDetails: 'Password should contain uppercase, lowercase letters, and digits.',
};

describe('passwordValidation', () => {
  let err: HTMLSpanElement;

  beforeEach(() => {
    err = document.createElement('span');
  });

  test('should return false if password contains spaces', () => {
    const result = passwordValidation('pass word', err);
    expect(result).toBe(false);
    expect(err.textContent).toBe(ERROR_MESSAGES.passwordNoSpaces);
  });

  test('should return false if password is less than 8 characters', () => {
    const result = passwordValidation('Pass1', err);
    expect(result).toBe(false);
    expect(err.textContent).toBe(ERROR_MESSAGES.atLeast8Characters);
  });

  test('should return false if password does not contain an uppercase letter', () => {
    const result = passwordValidation('password1', err);
    expect(result).toBe(false);
    expect(err.textContent).toBe(ERROR_MESSAGES.passwordDetails);
  });

  test('should return false if password does not contain a lowercase letter', () => {
    const result = passwordValidation('PASSWORD1', err);
    expect(result).toBe(false);
    expect(err.textContent).toBe(ERROR_MESSAGES.passwordDetails);
  });

  test('should return false if password does not contain a digit', () => {
    const result = passwordValidation('Password', err);
    expect(result).toBe(false);
    expect(err.textContent).toBe(ERROR_MESSAGES.passwordDetails);
  });

  test('should return true if password meets all criteria', () => {
    const result = passwordValidation('Password1', err);
    expect(result).toBe(true);
    expect(err.textContent).toBe('');
  });

  test('should return true if err is not provided', () => {
    const result = passwordValidation('Password1');
    expect(result).toBe(true);
  });
});