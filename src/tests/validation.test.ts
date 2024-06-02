import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ERROR_MESSAGES,
  validationBirth,
  yearValidation,
} from '../utils/validations/validationsComponents';
import { calculateAge } from '../utils/general/ageAndTextChecks';

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

describe('calculateAge', () => {
  it('should return the correct age when the birthday has passed this year', () => {
    const date = new Date(2000, 0, 1);
    const currentDate = new Date(2024, 4, 10);
    vi.setSystemTime(currentDate);
    const age = calculateAge(date);
    expect(age).toBe(24);
  });

  it('should return the correct age when the birthday is today', () => {
    const date = new Date(2000, 4, 10);
    const currentDate = new Date(2024, 4, 10);
    vi.setSystemTime(currentDate);
    const age = calculateAge(date);
    expect(age).toBe(24);
  });

  it('should return the correct age when the birthday is yet to come this year', () => {
    const date = new Date(2000, 11, 31);
    const currentDate = new Date(2024, 4, 10);
    vi.setSystemTime(currentDate);
    const age = calculateAge(date);
    expect(age).toBe(23);
  });
});

describe('yearValidation', () => {
  let errorSpan: HTMLSpanElement;

  beforeEach(() => {
    errorSpan = document.createElement('span');
  });

  it('should return a number if the value is a valid year and no error span is provided', () => {
    const result = yearValidation('2000');
    expect(result).toBe(2000);
  });

  it('should set the error message if the value is not a number', () => {
    yearValidation('abc', errorSpan);
    expect(errorSpan.textContent).toBe(ERROR_MESSAGES.mustBeNumber);
  });

  it('should set the error message if the age is less than 13', () => {
    const currentDate = new Date(2024, 4, 10);
    vi.setSystemTime(currentDate);
    yearValidation('2015', errorSpan);
    expect(errorSpan.textContent).toBe(ERROR_MESSAGES.ageRequirement);
  });

  it('should clear the error message if the age is 13 or older', () => {
    const currentDate = new Date(2024, 4, 10);
    vi.setSystemTime(currentDate);
    yearValidation('2000', errorSpan);
    expect(errorSpan.textContent).toBe('');
  });

  it('should return a number if the value is a valid year and error span is provided', () => {
    const result = yearValidation('2000', errorSpan);
    expect(result).toBe(2000);
    expect(errorSpan.textContent).toBe('');
  });
});

describe('calculateAge', () => {
  it('should return the correct age when the birthday has passed this year', () => {
    const date = new Date(2000, 0, 1);
    const currentDate = new Date(2024, 4, 10);
    vi.setSystemTime(currentDate);
    const age = calculateAge(date);
    expect(age).toBe(24);
  });

  it('should return the correct age when the birthday is today', () => {
    const date = new Date(2000, 4, 10);
    const currentDate = new Date(2024, 4, 10);
    vi.setSystemTime(currentDate);
    const age = calculateAge(date);
    expect(age).toBe(24);
  });

  it('should return the correct age when the birthday is yet to come this year', () => {
    const date = new Date(2000, 11, 31);
    const currentDate = new Date(2024, 4, 10);
    vi.setSystemTime(currentDate);
    const age = calculateAge(date);
    expect(age).toBe(23);
  });
});
