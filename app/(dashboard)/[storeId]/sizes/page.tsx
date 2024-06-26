import prisma from "@/prisma/client";
import Client from "@/components/Client";
import columns from "./(components)/columns";

export default async function SizesPage({ params }: { params: { storeId: string } }) {
  const sizes = await prisma.size.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-col max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Client data={sizes} columns={columns} entityName="Size" entityNamePlural="sizes" searchKey="name" />
      </div>
    </div>
  );
}
