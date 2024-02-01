import type { CardImage } from '../../types/card-image.type';

type ProductImageProps = {
  cardImage: CardImage;
}

export default function ProductImageComponent({ cardImage }: ProductImageProps) {
  return (
    <picture data-testid='product-image'>
      <source
        type="image/webp"
        srcSet={`${cardImage.previewImgWebp}, ${cardImage.previewImgWebp2x} 2x`}
      />
      <img
        src="img/content/orlenok.jpg"
        srcSet="img/content/orlenok@2x.jpg 2x"
        alt={cardImage.name}
      />
    </picture>
  );
}
