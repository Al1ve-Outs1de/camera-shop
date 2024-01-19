import type { CatalogCard } from '../types/catalog-card-type';
import CatalogCardComponent from './catalog-card';

type CatalogListProps = {
  cards: CatalogCard[];
}

export default function CatalogListComponent({ cards }: CatalogListProps) {
  return (
    <div className="cards catalog__cards">
      {cards.map((card) => <CatalogCardComponent catalogCard={card} key={card.id} />)}
    </div>
  );
}
