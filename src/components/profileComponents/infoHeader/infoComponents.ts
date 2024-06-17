export function checkLength(name: string): string {
  if (name.length > 20) {
    return (name = name.slice(0, 20) + '...');
  } else {
    return name;
  }
}
