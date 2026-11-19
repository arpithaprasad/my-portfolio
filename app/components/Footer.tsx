import Link from "next/link";
import { builtWith, pageRooms, portfolio, RESUME_URL, rooms } from "../data/portfolio";
import CopyEmail from "./CopyEmail";
import Logo from "./Logo";
import RangoliBorder from "./RangoliBorder";

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--apricot)]";
const linkCls = "focus-ring text-[15px] text-[var(--background)] transition-colors hover:text-[var(--apricot)]";

/*
 * Burgundy sign-off (B4 on the footer canvas): an invitation and every link up
 * top, the rangoli drawing itself in, ಧನ್ಯವಾದ, and the tools the site is built with.
 */
export default function Footer() {
  const { email, linkedin } = portfolio.contact;
  return (
    <footer
      className="bg-[var(--burgundy)] px-6 pb-8 pt-14 text-[var(--background)] md:px-12"
      style={{
        backgroundImage: "radial-gradient(rgba(240,162,98,0.14) 1.4px, transparent 1.6px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div className="col-span-2 flex items-start gap-5 lg:col-span-1">
            <Logo size={64} inverse className="hidden shrink-0 -rotate-6 sm:block" />
            <div className="flex flex-col gap-5">
              <h2 className="font-serif text-[2.2rem] font-normal leading-[1.05] md:text-[2.75rem]">
                Let’s build something <em className="text-[var(--apricot)]">considered.</em>
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${email}`}
                  className="focus-ring border-b border-[var(--apricot)] pb-0.5 text-base text-[var(--background)] hover:text-[var(--apricot)]"
                >
                  {email}
                </a>
                <CopyEmail email={email} />
              </div>
            </div>
          </div>

          <nav aria-label="Footer pages" className="flex flex-col gap-3.5">
            <p className={label}>Pages</p>
            <ul className="flex flex-col gap-2.5">
              {pageRooms.map((k) => (
                <li key={k}>
                  <Link href={rooms[k].href} className={linkCls}>
                    {rooms[k].label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3.5">
            <p className={label}>Elsewhere</p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={`mailto:${email}`} className={linkCls}>
                  Email
                </a>
              </li>
              <li>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  LinkedIn ↗
                </a>
              </li>
              <li>
                {RESUME_URL ? (
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    Resume ↗
                  </a>
                ) : (
                  <span className="text-[15px] text-[#f3e6e2]">Resume · soon</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        <RangoliBorder className="mx-auto mt-6 block h-auto w-full max-w-[1200px]" />
        <p className="mt-5 text-center text-[22px]" lang="kn" style={{ fontFamily: "'Noto Sans Kannada', sans-serif" }}>
          ಧನ್ಯವಾದ{" "}
          <span lang="en" className="font-serif text-base italic text-[#f3e6e2]">
            · thank you for stopping by
          </span>
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-[rgba(250,249,246,0.18)] pt-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            <p className={label}>Built with</p>
            <ul className="flex flex-wrap gap-2">
              {builtWith.map((t) => (
                <li key={t} className="rounded-full border border-[rgba(240,162,98,0.55)] px-3 py-1 text-[13px] text-[#f3e6e2]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[13px] text-[#f3e6e2]">© {new Date().getFullYear()} {portfolio.name}</p>
        </div>
      </div>
    </footer>
  );
}
