import { Header } from "@/components/header";

export default async function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col">
      <Header variant="public" />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
