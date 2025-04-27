import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-4">
      <div className="flex-col bg-accent border rounded-2xl p-4">
        <h1 className="font-extrabold text-7xl">ESO Guild Website Example</h1>
        <h3 className="font-light text-2xl text-center">a project by mta630</h3>
      </div>
      <Card className="relative mt-12 w-2/3 flex-1 border-4 border-black">
        <Image src="/background-1.png" alt="Background Image" fill={true} />
      </Card>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          This is the main landing page of the application. We are currently
          under construction. Check back later for updates!
        </CardContent>
      </Card>
    </div>
  );
}
