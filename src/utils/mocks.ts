import { BasketProduct } from '../types/bakset-product.type';
import { faker } from '@faker-js/faker';
import type { Card } from '../types/catalog-card.type';
import type { Review } from '../types/review.type';

export const makeFakeCard = (): Card => ({
  id: faker.number.int(),
  category: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  level: faker.lorem.word(),
  name: faker.commerce.productName(),
  previewImg: faker.image.url(),
  previewImg2x: faker.image.url(),
  previewImgWebp: faker.image.url(),
  previewImgWebp2x: faker.image.url(),
  price: faker.number.int({ min: 1 }),
  rating: faker.number.int({ min: 1, max: 5 }),
  reviewCount: faker.number.int(),
  type: faker.lorem.word(),
  vendorCode: faker.lorem.word(),
});

export const makeFakeReview = (): Review => ({
  advantage: faker.lorem.paragraph(),
  cameraId: faker.number.int({ min: 1 }),
  createAt: faker.date.anytime().toString(),
  disadvantage: faker.lorem.paragraph(),
  id: faker.string.uuid(),
  rating: faker.number.int({ min: 1, max: 5 }),
  review: faker.lorem.paragraph(),
  userName: faker.internet.displayName(),
});

export const makeFakeBasketProduct = (): BasketProduct => ({
  card: makeFakeCard(),
  count: faker.number.int({ min: 1 }),
});
