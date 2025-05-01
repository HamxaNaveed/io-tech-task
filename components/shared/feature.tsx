interface FeatureProps {
  title_en: string;
  title_ar?: string;
  description_en?: string;
  description_ar?: string;
  category?: "general" | "corporate" | "individual";
}

export default function Feature({
  title_en,
  title_ar,
  description_en,
  description_ar,
  category = "general",
}: FeatureProps) {
  return (
    <div className="feature">
      <h3 className="font-medium">{title_en}</h3>
      {description_en && <p className="text-gray-600">{description_en}</p>}
    </div>
  );
}
