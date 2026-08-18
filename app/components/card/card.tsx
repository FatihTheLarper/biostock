import Image, { StaticImageData } from 'next/image';

interface CardItems {
  title: string;
  image: string | StaticImageData;
  description: string;
}

const Card = ({ title, image, description }: CardItems) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-green-500 dark:bg-green-600 rounded-xl shadow-lg overflow-hidden text-white transition-colors">
      <div id="title" className="text-xl px-6 py-4 text-center">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div id="image" className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div id="description" className="text-lg px-6 py-4 text-center">
        <p className="opacity-90">{description}</p>
      </div>
    </div>
  );
};

export default Card;
