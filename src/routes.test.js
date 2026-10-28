import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import { PROJECTS } from './content/site';

let location;
const Spy = () => {
  location = useLocation();
  return null;
};

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
      <Spy />
    </MemoryRouter>
  );

beforeAll(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
});

test('home lists every featured project as a link to its detail page', () => {
  renderAt('/');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('messy public data');
  PROJECTS.filter((p) => p.featured !== false).forEach((p) => {
    const link = screen.getAllByRole('link').find((a) => a.getAttribute('href') === `/work/${p.slug}` && a.textContent.includes(p.oneLiner));
    expect(link).toBeTruthy();
  });
});

test('clicking a featured card opens the project, and "All work" returns home', async () => {
  renderAt('/');
  const card = screen.getAllByRole('link').find((a) => a.getAttribute('href') === '/work/yc-dataset' && a.textContent.includes('Dataset'));
  await userEvent.click(card);
  expect(location.pathname).toBe('/work/yc-dataset');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('YC Startup Dataset');

  await userEvent.click(screen.getByRole('link', { name: /all work/i }));
  expect(location.pathname).toBe('/');
  expect(location.hash).toBe('#featured');
});

test('work index links to internal pages and to external sources in a new tab', async () => {
  renderAt('/');
  const internal = screen.getAllByRole('link').filter((a) => a.getAttribute('href') === '/work/prc-data-challenge-2026');
  expect(internal.length).toBeGreaterThanOrEqual(2); // featured card + index entry
  await userEvent.click(internal[internal.length - 1]);
  expect(location.pathname).toBe('/work/prc-data-challenge-2026');

  renderAt('/');
  const lexivox = screen.getAllByRole('link', { name: /lexivox/i })[0];
  expect(lexivox).toHaveAttribute('href', 'https://lexivox.dvaitatech.com');
  expect(lexivox).toHaveAttribute('target', '_blank');
  expect(lexivox).toHaveAttribute('rel', 'noopener noreferrer');
  expect(lexivox).toHaveTextContent(/adapted from xenova/i);
});

test.each(PROJECTS.map((p) => p.slug))('direct route /work/%s renders and links to its source', (slug) => {
  const p = PROJECTS.find((x) => x.slug === slug);
  renderAt(`/work/${slug}`);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(p.name);
  if (p.source) expect(screen.getByRole('link', { name: /source on github/i })).toHaveAttribute('href', p.source);
  else expect(screen.queryByRole('link', { name: /source on github/i })).toBeNull();
  if (p.live) expect(screen.getByRole('link', { name: new RegExp(p.liveLabel || 'open live site', 'i') })).toHaveAttribute('href', p.live);
  expect(document.title).toBe(`${p.name} · Saurabh Nandedkar`);
});

test('next-project link cycles through projects', async () => {
  renderAt(`/work/${PROJECTS[PROJECTS.length - 1].slug}`);
  await userEvent.click(screen.getByRole('link', { name: /next project/i }));
  expect(location.pathname).toBe(`/work/${PROJECTS[0].slug}`);
});

test.each(['/work/does-not-exist', '/blog/airgapped-repo-management', '/content/projects/password-manager/index.md', '/random'])(
  'unknown or retired route %s redirects home',
  (path) => {
    renderAt(path);
    expect(location.pathname).toBe('/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('messy public data');
  }
);

test('header navigation targets home sections', () => {
  renderAt('/work/newsglobe');
  const nav = screen.getByRole('navigation', { name: /primary/i });
  const hrefs = Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'));
  expect(hrefs).toEqual(['/#now', '/#featured', '/#index', '/#contact']);
});

test('no Dvaita client names or retired claims appear on the homepage', () => {
  renderAt('/');
  const text = document.body.textContent;
  ['Tech Polymath', 'Turing', 'Prismberry', 'Resume', 'Years Experience'].forEach((s) => expect(text).not.toContain(s));
});

test('"Latest public ship" is Wakefield and links to its detail page, which is not a featured card', async () => {
  renderAt('/');
  const glance = screen.getByRole('complementary', { name: /at a glance/i });
  expect(glance).not.toHaveTextContent('NewsGlobe');
  const featured = screen.getByRole('heading', { name: 'Featured' }).closest('section');
  expect(featured).not.toHaveTextContent('Wakefield');
  expect(screen.getAllByRole('link').filter((a) => a.getAttribute('href') === '/work/wakefield')).toHaveLength(2); // glance + index

  await userEvent.click(screen.getByRole('link', { name: /Wakefield · 2026/ }));
  expect(location.pathname).toBe('/work/wakefield');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wakefield');
  expect(document.title).toBe('Wakefield · Saurabh Nandedkar');
  expect(screen.getByRole('link', { name: /open api docs/i })).toHaveAttribute('href', 'https://api.saurabhn.com/docs');
});

test('Wakefield page links only to its public API docs, not to a source repository', () => {
  renderAt('/work/wakefield');
  const external = Array.from(document.querySelectorAll('main a[target="_blank"]')).map((a) => a.getAttribute('href'));
  expect(external).toEqual(['https://api.saurabhn.com/docs']);
  expect(screen.queryByRole('link', { name: /source on github/i })).toBeNull();
});

test('re-clicking a header link for the current section scrolls again', async () => {
  Element.prototype.scrollIntoView.mockClear();
  renderAt('/#now');
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  const now = screen.getByRole('navigation', { name: /primary/i }).querySelector('a[href="/#now"]');
  await userEvent.click(now);
  expect(location.hash).toBe('#now');
  expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(2);
});
