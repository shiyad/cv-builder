export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col">
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">{children}</div>
        </div>
      </main>
    </div>
  );
}
