export const validatePassword = (password: string): boolean => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  if (!uppercaseRegex.test(password)) {
    return false;
  }
  if (!lowercaseRegex.test(password)) {
    return false;
  }
  if (!numberRegex.test(password)) {
    return false;
  }
  return true;
};
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
