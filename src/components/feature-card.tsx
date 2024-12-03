import Image from "next/image";
interface FeatureCardProps {
  title: string;
  src: string;
  description: string;
}
export default function FeatureCard({
  title,
  src,
  description,
}: FeatureCardProps) {
  return (
    <div className="backdrop-blur-xl rounded-xl  backdrop-saturate-150 bg-slate-950/10 border border-slate-300/10">
      <div className="w-full overflow-hidden rounded-lg">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={src}
          alt={title}
        />
      </div>
      <div className="py-3 space-y-3 px-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-lg font-medium">{description}</p>
      </div>
    </div>
  );
}
