import { BookingPage } from "@/components/booking/BookingPage";
import { dineRows } from "@/lib/content";

export function generateStaticParams() {
  return dineRows.map(({ id }) => ({ kitchen: id }));
}
export default async function Page({ params }: { params: Promise<{ kitchen: string }> }) {
  const { kitchen } = await params;
  return <BookingPage kitchen={dineRows.find((row) => row.id === kitchen) || dineRows[0]} />;
}
