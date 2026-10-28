import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PROFILE, PROJECTS } from '../content/site';

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-1 rounded-lg border border-border bg-card px-4 text-sm font-medium hover:border-accent">
    {children} <span aria-hidden="true">↗</span>
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

const Project = () => {
  const { slug } = useParams();
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  useEffect(() => {
    document.title = project ? `${project.name} · ${PROFILE.name}` : PROFILE.name;
    return () => { document.title = PROFILE.name; };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <article className="mx-auto max-w-[760px] pb-16 pt-8 sm:pt-12">
      <Link to="/#featured" className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <span aria-hidden="true">←</span> All work
      </Link>

      <p className="label mt-6">{project.kind} · {project.year}</p>
      <h1 className="mt-3 text-[clamp(30px,4.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.03em]">{project.name}</h1>
      <p className="mt-4 text-[17px] text-muted-foreground sm:text-lg">{project.oneLiner}</p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {project.live && <ExternalLink href={project.live}>{project.liveLabel || 'Open live site'}</ExternalLink>}
        {project.source && <ExternalLink href={project.source}>Source on GitHub</ExternalLink>}
      </div>

      {project.image ? (
        <img src={project.image} alt={project.imageAlt} className="mt-8 aspect-[16/9] w-full rounded-lg border border-border object-cover object-top" />
      ) : (
        <div className="mt-8 flex items-end rounded-lg border border-border bg-[repeating-linear-gradient(0deg,#EFEDE7_0_1px,transparent_1px_22px)] bg-[#F3F1EC] p-6 sm:p-8">
          <p className="text-[clamp(44px,8vw,72px)] font-semibold leading-none tracking-[-0.04em]">
            {project.stat.value}
            <span className="mt-3 block font-mono text-xs font-normal tracking-normal text-muted-foreground">{project.stat.caption}</span>
          </p>
        </div>
      )}

      <dl className="mt-8 grid gap-4 rounded-lg border border-border bg-card p-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="label">Stack</dt>
          <dd className="mt-2">{project.stack.join(' · ')}</dd>
        </div>
        <div>
          <dt className="label">Key facts</dt>
          <dd className="mt-2">{project.facts.join(' · ')}</dd>
        </div>
      </dl>

      <h2 className="mt-12 text-xl font-semibold tracking-[-0.01em]">The problem</h2>
      <p className="mt-3 text-base leading-7">{project.problem}</p>

      <h2 className="mt-10 text-xl font-semibold tracking-[-0.01em]">What I built</h2>
      <ul className="mt-3 space-y-2.5 text-base leading-7">
        {project.built.map((b) => (
          <li key={b} className="flex gap-3"><span aria-hidden="true" className="font-mono text-accent">→</span><span>{b}</span></li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">{project.figuresNote || 'Figures come from the project’s README.'}</p>

      <Link to={`/work/${next.slug}`} className="tile mt-12 flex items-center justify-between gap-4">
        <span>
          <span className="label">Next project</span>
          <span className="mt-2 block text-lg font-semibold">{next.name}</span>
        </span>
        <span aria-hidden="true" className="font-mono text-muted-foreground">→</span>
      </Link>
    </article>
  );
};

export default Project;
