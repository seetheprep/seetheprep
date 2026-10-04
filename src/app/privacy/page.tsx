import { uiCopy } from "@/data/site";
import Link from "next/link";
export default function Page() {
  return (
    <main className="app-page privacy-page" id="main-content">
      <Link className="text-link" href="/early-access/">
        {uiCopy.page_privacy_1}
      </Link>
      <h1>{uiCopy.page_privacy_2}</h1>
      <p>{uiCopy.page_privacy_3}</p>
      <p>{uiCopy.page_privacy_4}</p>
      <p>
        {uiCopy.page_privacy_5}
        <a href="mailto:support@seetheprep.com">{uiCopy.page_privacy_6}</a>.
      </p>
      <p>{uiCopy.page_privacy_7}</p>
      <p>
        {uiCopy.page_privacy_8}
        <br />
        {uiCopy.page_privacy_9}
        <br />
        {uiCopy.page_privacy_10}
      </p>
    </main>
  );
}
