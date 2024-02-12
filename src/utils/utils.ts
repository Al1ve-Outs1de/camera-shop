import { SortingActiveType } from '../consts';
import { Card } from '../types/catalog-card.type';

export const sortingCards: Record<string, (cards: Card[]) => Card[]> = {
  [SortingActiveType.ByPrice]: (cards) =>
    [...cards].sort((cardA, cardB) => cardA.price - cardB.price),
  [SortingActiveType.ByPopular]: (cards) =>
    [...cards].sort((cardA, cardB) => cardB.rating - cardA.rating),
  '': (cards) => [...cards],
};
