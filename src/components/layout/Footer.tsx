import { uiCopy } from "@/data/site";

import { site } from "@/data/site";
import { Facebook, Instagram, Mail, Play, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="foot" aria-label="Footer">
      <Link className="brand" href="/#top">
        <Image
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 400px"
          src="/assets/brand/logo-white.png"
          alt="See the PREP."
          width={640}
          height={315}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <p className="tag">
        {uiCopy.Footer__1}
        <br />
        {uiCopy.Footer__2}
      </p>
      <a className="mail" href={`mailto:${site.email}`}>
        <Mail size={16} color="var(--orange)" /> {site.email}
      </a>
      <div className="soc">
        <a href={site.instagram} target="_blank" rel="noopener" aria-label="Instagram">
          <Instagram size={18} />
        </a>
        <a href={site.facebook} target="_blank" rel="noopener" aria-label="Facebook">
          <Facebook size={18} />
        </a>
      </div>
      <div className="cols">
        <div>
          <h4>{uiCopy.Footer__3}</h4>
          <Link href="/kitchens/all/">{uiCopy.Footer__4}</Link>
          <Link href="/#dine">{uiCopy.Footer__5}</Link>
          <Link href="/#how">{uiCopy.Footer__6}</Link>
          <span>{uiCopy.Footer__7}</span>
          <Link href="/#how">{uiCopy.Footer__8}</Link>
        </div>
        <div>
          <h4>{uiCopy.Footer__9}</h4>
          <Link href="/#join">{uiCopy.Footer__10}</Link>
          <Link href="/#join">{uiCopy.Footer__11}</Link>
          <Link href="/#join">{uiCopy.Footer__12}</Link>
          <Link href="/#join">{uiCopy.Footer__13}</Link>
          <a href={`mailto:${site.email}`}>{uiCopy.Footer__14}</a>
        </div>
      </div>
      <div className="apps">
        <p>{uiCopy.Footer__15}</p>
        <div className="appb">
          <span>
            <Smartphone size={20} />
            <span>
              <small>{uiCopy.Footer__16}</small>
              <b>{uiCopy.Footer__17}</b>
            </span>
          </span>
          <span>
            <Play size={20} />
            <span>
              <small>{uiCopy.Footer__18}</small>
              <b>{uiCopy.Footer__19}</b>
            </span>
          </span>
        </div>
      </div>
      <div className="legal">
        {site.company} · {site.address}
        <br />© {site.year} {site.company}
        {uiCopy.Footer__20}
        <nav>
          <span>{uiCopy.Footer__21}</span>
          <span>{uiCopy.Footer__22}</span>
          <span>{uiCopy.Footer__23}</span>
          <span>{uiCopy.Footer__24}</span>
          <span>{uiCopy.Footer__25}</span>
        </nav>
      </div>
    </footer>
  );
}
