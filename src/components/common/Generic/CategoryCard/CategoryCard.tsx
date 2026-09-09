import type { CategoryCard } from "@/components/common/Generic/CategoryCard/CategoryCard";
import { Card } from "@/components/common/Generic/Card/Card";

type CategoryCardProps = {
  categorycard: Category;
  classNameImage?: string;
};

export function CategoryCard({
  categorycard,
  classNameImage = "object-cover object-center",
}: CategoryCardProps) {
  return (
    <Card variant="container" className="w-full relative overflow-hidden group">
      <img
        src={categorycard.image}
        className={`h-64 w-full rounded-md grayscale
         group-hover:scale-105 group-hover:grayscale-0 group-hover:-translate-y-1 transition-all duration-300 ${classNameImage}`}
      />

      <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center rounded-md">
        <p className="text-white bg-night-soft font-bold text-xl group-hover:-translate-y-1 transition-all duration-300 rounded-md p-2">
          {categorycard.name}
        </p>
      </div>
    </Card>
  );
}
