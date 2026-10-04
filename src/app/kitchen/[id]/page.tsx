import { KitchenPage } from "@/components/kitchen/KitchenPage";
import { allOrderKitchens, findKitchen } from "@/lib/content";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return allOrderKitchens.map((k) => ({ id: k.id }));
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kitchen = findKitchen(id);
  if (!kitchen) notFound();
  return <KitchenPage kitchen={kitchen} />;
}
