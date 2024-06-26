import { Billboard } from "@prisma/client";
import prisma from "@/prisma/client";
import Client from "@/components/Client";
import columns from "./(components)/columns";

export default async function BillboardsPage({ params }: { params: { storeId: string } }) {
  const billboards: Billboard[] = await prisma.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-col max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Client
          data={billboards}
          entityName="Billboard"
          entityNamePlural="billboards"
          columns={columns}
          searchKey="label"
        />
      </div>
    </div>
  );
}
