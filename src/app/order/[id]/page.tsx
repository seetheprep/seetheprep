import { TrackingPage } from "@/components/order/TrackingPage";
export function generateStaticParams() {
  return [{ id: "STP-1048" }];
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TrackingPage id={id} />;
}
