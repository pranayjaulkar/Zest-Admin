import { Billboard, Category, Prisma } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import Client from "@/components/Client";
import columns from "./(components)/columns";

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories: (Category & { billboard: Billboard })[] | null =
    await prismadb.category.findMany({
      where: { storeId: params.storeId },
      include: { billboard: true },
      orderBy: { createdAt: "desc" },
    });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Client
          data={categories}
          entityName="Category"
          entityNamePlural="Categories"
          columns={columns}
          searchKey="name"
        />
      </div>
    </div>
  );
}
