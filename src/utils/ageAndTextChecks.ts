export function checkUpperCaseLowerCase(str: string): boolean {
  let hasUpperCase = false;
  let hasLowerCase = false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i].toUpperCase()) {
      hasUpperCase = true;
    } else if (str[i] === str[i].toLowerCase()) {
      hasLowerCase = true;
    }
  }

  return hasUpperCase && hasLowerCase;
}
export function isValidDateInput(age: number): boolean {
  if (age < 13) {
    console.log('is too young old');
    return false;
  }
  console.log('privet');
  return true;
}
export function calculateAge(date: Date): number {
  const currentDate = new Date();

  let age = currentDate.getFullYear() - date.getFullYear();

  if (
    currentDate.getMonth() < date.getMonth() ||
    (currentDate.getMonth() === date.getMonth() &&
      currentDate.getDate() < date.getDate())
  ) {
    age--;
  }
  return age;
}
