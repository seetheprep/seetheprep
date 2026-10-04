import { uiCopy } from "@/data/site";
import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main-content" className="app-page flow-empty">
      <h1>{uiCopy.notfound_app_1}</h1>
      <Link className="primary-button" href="/kitchens/all/">
        {uiCopy.notfound_app_2}
      </Link>
    </main>
  );
}
