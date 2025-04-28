export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageTitle = slug[0]
    ? slug[0].replace(/-/g, " ").toLocaleUpperCase()
    : "Page Not Found";
  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-4xl font-bold">{pageTitle}</h1>
    </div>
  );
}
