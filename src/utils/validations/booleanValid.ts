export let nameValid = false;
export let lastNameValid = false;
export let passworValid = false;
export let mailValid = false;
export let dateValid = false;
export let postValid = false;
export let cityValid = false;
export let streetValid = false;

export function setName(boolean: boolean): void {
  nameValid = boolean;
}
export function setlastName(boolean: boolean): void {
  lastNameValid = boolean;
}
export function setPassword(boolean: boolean): void {
  passworValid = boolean;
}
export function setMail(boolean: boolean): void {
  mailValid = boolean;
}
export function setDate(boolean: boolean): void {
  dateValid = boolean;
}
export function setPost(boolean: boolean): void {
  postValid = boolean;
}
export function setCity(boolean: boolean): void {
  cityValid = boolean;
}
export function setStreet(boolean: boolean): void {
  streetValid = boolean;
}
