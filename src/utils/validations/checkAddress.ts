export function searchPost(): [
  NodeListOf<HTMLLabelElement>,
  NodeListOf<HTMLInputElement>,
] {
  const labelPost = document.querySelectorAll(
    '.label-post',
  ) as NodeListOf<HTMLLabelElement>;
  const inputPost = document.querySelectorAll(
    '.input-post',
  ) as NodeListOf<HTMLInputElement>;
  return [labelPost, inputPost];
}
export function searchCity(): [
  NodeListOf<HTMLLabelElement>,
  NodeListOf<HTMLInputElement>,
] {
  const labelCity = document.querySelectorAll(
    '.label-city',
  ) as NodeListOf<HTMLLabelElement>;
  const inputCity = document.querySelectorAll(
    '.input-city',
  ) as NodeListOf<HTMLInputElement>;
  return [labelCity, inputCity];
}
export function searchStreet(): [
  NodeListOf<HTMLLabelElement>,
  NodeListOf<HTMLInputElement>,
] {
  const labelStreet = document.querySelectorAll(
    '.label-street',
  ) as NodeListOf<HTMLLabelElement>;
  const inputStreet = document.querySelectorAll(
    '.input-street',
  ) as NodeListOf<HTMLInputElement>;
  return [labelStreet, inputStreet];
}
