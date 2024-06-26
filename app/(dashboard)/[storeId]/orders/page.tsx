import { formatter } from "@/lib/utils";
import prisma from "@/prisma/client";
import Client from "@/components/Client";
import columns from "@/app/(dashboard)/[storeId]/orders/(components)/columns";

export default async function OrdersPage({ params }: { params: { storeId: string } }) {
  const orders = await prisma.order.findMany({
    where: { storeId: params.storeId },
    include: { orderItems: { include: { product: true, productVariation: { include: { color: true, size: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  const formattedOrders = orders.map((order) => ({
    ...order,
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    orderItems: order.orderItems.map((item) => ({
      ...item,
      // convert price to number before passing it to client component
      product: { ...item.product, price: formatter.format(Number(item.product.price)) },
    })),
  }));

  return (
    <div className="flex-col max-w-screen-xl mx-auto">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Client
          data={formattedOrders}
          order
          columns={columns}
          entityName="Order"
          entityNamePlural="orders"
          searchKey="products"
        />
      </div>
    </div>
  );
}
