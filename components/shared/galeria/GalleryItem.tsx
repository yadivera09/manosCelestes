import Image from "next/image";

interface GalleryItemProps {
  image: string;
  activity: string;
  year: number;
  onClick: () => void;
}

export default function GalleryItem({ image, activity, year, onClick }: GalleryItemProps) {
  return (
    <button
      type="button"
      className="group relative w-full aspect-square overflow-hidden rounded-xl bg-neutral-100 flex focus:outline-none focus:ring-2 focus:ring-primary-medium focus:ring-offset-2"
      onClick={onClick}
    >
      <Image
        src={image}
        alt={`${activity} - ${year}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
        <svg
          className="w-8 h-8 text-white drop-shadow-md scale-75 group-hover:scale-100 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </button>
  );
}
