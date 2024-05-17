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
export function checkDaysInMonth(month: string, year: string): number {
  return new Date(+year, +month, 0).getDate();
}
