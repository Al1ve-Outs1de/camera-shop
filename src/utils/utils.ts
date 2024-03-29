import { SortingActiveType } from '../consts';
import type { Card } from '../types/catalog-card.type';
import type { FilterStateType } from '../types/filter-state.type';

export const sortingCards: Record<string, (cards: Card[]) => Card[]> = {
  [SortingActiveType.ByPrice]: (cards) =>
    [...cards].sort((cardA, cardB) => cardA.price - cardB.price),
  [SortingActiveType.ByPopular]: (cards) =>
    [...cards].sort((cardA, cardB) => cardA.rating - cardB.rating),
  '': (cards) => [...cards],
};

export function filterCatalog(cards: Card[], filters: FilterStateType) {
  const { category, level, type } = filters;

  let filteredCards = cards;

  if (category) {
    filteredCards = filteredCards.filter((card) => card.category === category);
  }

  if (type.length) {
    filteredCards = filteredCards.filter((card) => type.includes(card.type));
  }

  if (level.length) {
    filteredCards = filteredCards.filter((card) => level.includes(card.level));
  }

  return filteredCards;
}

export function toggleArrayElement<T>(array: T[], item: T): T[] {
  if (array.includes(item)) {
    return array.filter((arrayItem) => arrayItem !== item);
  }

  return [...array, item];
}

export function toggleSearchParam(
  condition: boolean,
  searchParams: URLSearchParams,
  paramName: string,
  paramValue: string
) {
  if (condition) {
    searchParams.set(paramName, paramValue);
  } else {
    searchParams.delete(paramName);
  }
}
