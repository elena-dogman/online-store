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
