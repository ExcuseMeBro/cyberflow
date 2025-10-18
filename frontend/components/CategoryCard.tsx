import { Card, CardBody } from '@nextui-org/react';
import { Category } from '@/types';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.id}`}>
      <Card className="w-32 flex-shrink-0 card-hover shadow-md" isPressable>
        <CardBody className="p-0">
          <div className="relative aspect-[3/4] w-full rounded-t-xl overflow-hidden">
            <img
              src={category.thumbnail || '/placeholder-category.jpg'}
              alt={category.name}
              className="w-full h-full object-cover smooth-transition hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="p-2">
            <p className="text-sm font-semibold truncate text-gray-800">{category.name}</p>
            {category.viewerCount && (
              <p className="text-xs text-gray-500">
                👁 {category.viewerCount.toLocaleString()}
              </p>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
