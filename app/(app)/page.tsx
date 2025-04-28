import { FeatureList } from "@/components/feature-list";
import { Hero } from "@/components/hero";
import { LinkHub } from "@/components/link-hub";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Hero />
      <FeatureList />
      <LinkHub />
    </div>
  );
}
