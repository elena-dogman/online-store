export function checkLength(name: string): string {
  if (name.length > 12) {
    return (name = name.slice(0, 20) + '...');
  } else {
    return name;
  }
}
