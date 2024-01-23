import type { Card } from '../types/catalog-card.type';
import CardComponent from './card';

type CatalogListProps = {
  cards: Card[];
}

export default function CatalogListComponent({ cards }: CatalogListProps) {
  return (
    <div className="cards catalog__cards">
      {cards.map((card) => <CardComponent catalogCard={card} key={card.id} />)}
    </div>
  );
}
