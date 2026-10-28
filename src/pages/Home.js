import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PROFILE, GLANCE, STELLAROS, DVAITA, PROJECTS, INDEX } from '../content/site';

const NewTab = () => <span className="sr-only"> (opens in a new tab)</span>;

const SectionHead = ({ id, title, children }) => (
  <div className="mb-[18px] flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
    <h2 id={id} className="scroll-mt-20 text-[26px] font-semibold tracking-[-0.02em]">{title}</h2>
    <p className="max-w-[52ch] text-sm text-muted-foreground">{children}</p>
  </div>
);

const Hero = () => (
  <section aria-labelledby="hero" className="grid items-end gap-10 pb-14 pt-12 md:grid-cols-[1.35fr_1fr] md:pt-[72px]">
    <div>
      <div className="mb-[22px] flex items-center gap-3">
        <div aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-[15px] font-semibold text-background">
          {PROFILE.initials}
        </div>
        <div>
          <p className="font-semibold">{PROFILE.name}</p>
          <p className="label mt-1">{PROFILE.tagline}</p>
        </div>
      </div>
      <h1 id="hero" className="text-balance text-[clamp(32px,4.8vw,54px)] font-semibold leading-[1.06] tracking-[-0.034em]">
        {PROFILE.heroLead}
        <em className="bg-[linear-gradient(transparent_62%,theme(colors.accent-soft)_62%)] not-italic">{PROFILE.heroEmphasis}</em>
        {PROFILE.heroTail}
      </h1>
      <p className="mt-[22px] max-w-[50ch] text-[17px] text-muted-foreground sm:text-lg">{PROFILE.sub}</p>
    </div>
    <aside aria-label="At a glance" className="rounded-lg border border-border bg-card p-5">
      <p className="label mb-1.5">At a glance</p>
      <dl>
        {GLANCE.map(([k, v, to]) => (
          <div key={k} className="flex items-center justify-between gap-3 border-b border-dashed border-border py-2.5 text-sm last:border-0">
            <dt>{k}</dt>
            <dd className="text-right font-mono text-xs text-muted-foreground">
              {to ? (
                <Link to={to} className="-my-2 inline-flex min-h-[32px] items-center text-accent underline-offset-4 hover:underline">{v} <span aria-hidden="true">&nbsp;→</span></Link>
              ) : v}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  </section>
);

const Now = () => (
  <section aria-labelledby="now" className="pb-14 pt-7">
    <SectionHead id="now" title="What I'm building now">A product I'm founding, and the company that pays for the experiments.</SectionHead>
    <div className="grid gap-3.5 md:grid-cols-6">
      <a href={STELLAROS.href} target="_blank" rel="noopener noreferrer" className="tile flex flex-col border-night bg-night text-zinc-100 md:col-span-4 md:row-span-2">
        <span aria-hidden="true" className="absolute right-5 top-5 font-mono text-zinc-400">↗</span>
        <span className="inline-flex items-center gap-[7px] font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-orange-300">
          <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_0_4px_rgba(194,65,12,.25)]" />
          {STELLAROS.role}
        </span>
        <h3 className="mb-1.5 mt-2.5 text-[30px] font-semibold tracking-[-0.015em]">{STELLAROS.name}<NewTab /></h3>
        <p className="max-w-[52ch] text-sm text-zinc-300">{STELLAROS.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {STELLAROS.tags.map((t) => <span key={t} className="tag border-night-line bg-night-2 text-zinc-300">{t}</span>)}
        </div>
        <div className="mt-auto pt-[22px]">
          <img src={STELLAROS.image} alt="StellarOS preview" loading="lazy" width="1200" height="560" className="aspect-[1200/560] w-full rounded-xl border border-night-line object-cover object-top" />
        </div>
      </a>
      <a href={DVAITA.href} target="_blank" rel="noopener noreferrer" className="tile flex flex-col md:col-span-2 md:row-span-2">
        <span aria-hidden="true" className="absolute right-5 top-5 font-mono text-muted-foreground">↗</span>
        <span className="label">{DVAITA.role}</span>
        <h3 className="mb-1.5 mt-2.5 text-xl font-semibold tracking-[-0.015em]">{DVAITA.name}<NewTab /></h3>
        <p className="text-sm text-muted-foreground">{DVAITA.summary}</p>
        <ul className="mb-4 mt-3 grid gap-1.5 text-[13px]">
          {DVAITA.offers.map((o) => (
            <li key={o}><span aria-hidden="true" className="font-mono text-accent">→ </span>{o}</li>
          ))}
        </ul>
        <img src={DVAITA.image} alt="Dvaita Technologies preview" loading="lazy" width="1200" height="630" className="mt-auto aspect-[1200/630] w-full rounded-[10px] border border-border object-cover" />
      </a>
    </div>
  </section>
);

const Featured = () => (
  <section aria-labelledby="featured" className="pb-14 pt-7">
    <SectionHead id="featured" title="Featured">Three projects that show how I work, each with a full write-up.</SectionHead>
    <ul className="grid gap-3.5 md:grid-cols-3">
      {PROJECTS.filter((p) => p.featured !== false).map((p) => (
        <li key={p.slug} className="flex">
          <Link to={`/work/${p.slug}`} className="tile group flex w-full flex-col p-0">
            {p.image ? (
              <div className="aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
                <img src={p.image} alt={p.imageAlt} loading="lazy" className="h-full w-full object-cover object-top" />
              </div>
            ) : (
              <div aria-hidden="true" className="flex aspect-[16/10] items-end border-b border-border bg-[repeating-linear-gradient(0deg,#EFEDE7_0_1px,transparent_1px_22px)] bg-[#F3F1EC] p-[18px]">
                <div className="text-[44px] font-semibold leading-none tracking-[-0.04em]">
                  {p.stat.value}
                  <span className="mt-2 block font-mono text-xs font-normal tracking-normal text-muted-foreground">{p.stat.caption}</span>
                </div>
              </div>
            )}
            <div className="px-5 pb-5 pt-[18px]">
              <span className="label">{p.kind}</span>
              <h3 className="mb-1.5 mt-2.5 text-xl font-semibold tracking-[-0.015em] group-hover:text-accent">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{p.oneLiner}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

const IndexItem = ({ item, dark }) => {
  const body = (
    <>
      <span className="text-sm font-semibold group-hover:text-accent">{item.name}</span>
      <span className={`font-mono text-[11px] ${dark ? 'text-zinc-400' : 'text-muted-foreground'}`}>{item.year}</span>
      <span className={`col-span-2 text-[13px] leading-[1.45] ${dark ? 'text-zinc-400' : 'text-muted-foreground'}`}>{item.note}</span>
    </>
  );
  const cls = `group grid grid-cols-[1fr_auto] gap-x-2.5 gap-y-0.5 border-t py-2.5 ${dark ? 'border-night-line' : 'border-border'}`;
  return item.to ? (
    <Link to={item.to} className={cls}>{body}</Link>
  ) : (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{body}<NewTab /></a>
  );
};

const WorkIndex = () => (
  <section aria-labelledby="index" className="pb-14 pt-7">
    <SectionHead id="index" title="Work index">Everything public and worth showing, grouped by what it is. Every item links to a source or a live build.</SectionHead>
    <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
      {INDEX.map((g) => (
        <section key={g.title} aria-label={g.title} className={`rounded-lg border p-5 ${g.dark ? 'border-night-2 bg-night-2 text-zinc-100' : 'border-border bg-card'}`}>
          <h3 className="flex items-baseline justify-between text-[15px] font-semibold">
            {g.title}
            <span className={`font-mono text-[11px] font-normal ${g.dark ? 'text-zinc-400' : 'text-muted-foreground'}`}>{String(g.items.length).padStart(2, '0')}</span>
          </h3>
          <p className={`mb-2.5 mt-1 text-[13px] ${g.dark ? 'text-zinc-400' : 'text-muted-foreground'}`}>{g.lede}</p>
          <ul>
            {g.items.map((item) => <li key={item.name}><IndexItem item={item} dark={g.dark} /></li>)}
          </ul>
        </section>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section aria-labelledby="contact" className="mb-10 grid items-center gap-6 rounded-[24px] bg-night p-7 text-zinc-100 sm:p-10 md:grid-cols-[1.4fr_1fr]">
    <div>
      <p className="label mb-3 text-zinc-400">Contact</p>
      <h2 id="contact" className="scroll-mt-20 text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[32px]">
        Building something hard with messy data?{' '}
        <a href={`mailto:${PROFILE.email}`} className="break-all border-b-2 border-accent sm:break-normal">{PROFILE.email}</a>
      </h2>
    </div>
    <ul className="grid gap-2.5 font-mono text-[13px]">
      {PROFILE.contactLinks.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center justify-between rounded-[10px] border border-night-line px-3.5 py-3 hover:border-accent">
            {l.label}<span aria-hidden="true">↗</span><NewTab />
          </a>
        </li>
      ))}
    </ul>
  </section>
);

const Home = () => {
  const { hash, key } = useLocation();

  // Router links preventDefault, so scroll ourselves; `key` changes on every
  // navigation, including a repeat click on the hash that is already current.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash, key]);

  return (
    <>
      <Hero />
      <Now />
      <Featured />
      <WorkIndex />
      <Contact />
    </>
  );
};

export default Home;
