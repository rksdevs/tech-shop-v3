export default function EmptyProducts() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm col-span-full row-span-full p-16 md:p2">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          No Matching Products
        </h3>
        <p className="text-sm text-muted-foreground">
          There are no products for the applied filters. Please change the
          applied filters.
        </p>
      </div>
    </div>
  );
}
