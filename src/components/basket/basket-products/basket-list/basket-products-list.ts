import {
  ElementParams,
  addInnerComponent,
  createElement,
} from '../../../../utils/general/baseComponent';
import createBasketProductsItem from './basket-products-item';

export default function createBasketProductsList(): HTMLElement {
  const basketProductsListPapams: ElementParams<'div'> = {
    tag: 'div',
    classNames: ['basket-products__basket-list'],
  };
  const basketProductsList = createElement(basketProductsListPapams);

  exampleProduct.forEach((e) => {
    const itemParams = {
      name: e.name,
      img: e.img,
      id: e.id,
      count: e.count,
      price: e.price,
    };
    const basketItem = createBasketProductsItem(itemParams);
    addInnerComponent(basketProductsList, basketItem);
  });
  return basketProductsList;
}
const exampleProduct = [
  {
    name: 'Apple iPhone 14 Pro Max ',
    img: '/assets/registration/background.jpg',
    id: '#25139526913984 ',
    count: '1',
    price: '$1399',
  },

  {
    name: 'Apple iPhone 12 Pro Max ',
    img: '/assets/registration/background.jpg',
    id: '#25139526913984 ',
    count: '1',
    price: '$1399',
  },
];
