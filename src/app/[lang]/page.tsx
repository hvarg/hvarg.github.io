import { Entry } from "@/components/Entry";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { TechList } from "@/components/TechList";
import { getResume, isLocale, otherLocale } from "@/lib/resume";
import { notFound } from "next/navigation";

export default async function ResumePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const resume = getResume(lang);
  const { ui, personal } = resume;
  const period = (start: string, end?: string) =>
    `${start} — ${end ?? ui.present}`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-10 print:py-0">
      <Header
        personal={personal}
        ui={ui}
        pdf={resume.meta.pdf}
        otherLanguage={otherLocale(lang)}
      />

      <Section title={ui.sections.about}>
        <p className="text-[0.9375rem] leading-relaxed text-muted">
          {resume.summary}
        </p>
      </Section>

      <Section title={ui.sections.experience} items={resume.experience}>
        {resume.experience.map((job) => (
          <Entry
            key={`${job.company}-${job.start}`}
            title={job.company}
            period={period(job.start, job.end)}
            subtitle={[job.role, job.location].filter(Boolean).join(" · ")}
          >
            {job.summary && (
              <p className="mt-2 text-sm text-muted">{job.summary}</p>
            )}
            <ul className="mt-2 space-y-1 text-[0.9375rem] leading-relaxed text-muted">
              {job.achievements.map((achievement) => (
                <li key={achievement} className="flex gap-2.5">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-rule" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
            <TechList items={job.technologies} />
          </Entry>
        ))}
      </Section>

      <Section title={ui.sections.projects} items={resume.projects}>
        {resume.projects.map((project) => (
          <Entry key={project.name} title={project.name} titleUrl={project.url}>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
              {project.description}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-4 text-[0.8125rem]">
              {[project.url, project.repository]
                .filter((href): href is string => Boolean(href))
                .map((href) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent decoration-rule underline-offset-4 hover:underline"
                  >
                    {href.replace(/^https?:\/\//, "")}
                  </a>
                ))}
            </p>
            <TechList items={project.technologies} />
          </Entry>
        ))}
      </Section>

      <Section title={ui.sections.education} items={resume.education}>
        {resume.education.map((item) => (
          <Entry
            key={`${item.degree}-${item.end}`}
            title={item.degree}
            period={item.start ? period(item.start, item.end) : item.end}
            subtitle={item.institution}
          >
            {item.detail && (
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            )}
          </Entry>
        ))}
      </Section>

      <Section title={ui.sections.skills} items={resume.skills}>
        <dl className="space-y-3">
          {resume.skills.map((group) => (
            <div key={group.category} className="sm:flex sm:gap-4">
              <dt className="eyebrow pt-1 pr-3 text-faint sm:w-40 sm:shrink-0">
                {group.category}
              </dt>
              <dd className="text-[0.9375rem] text-muted">
                {group.skills.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={ui.sections.languages} items={resume.languages}>
        <ul className="space-y-1 text-[0.9375rem] text-muted">
          {resume.languages.map((language) => (
            <li key={language.name}>
              <span className="text-ink">{language.name}</span> — {language.level}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={ui.sections.publications} items={resume.publications}>
        {resume.publications.map((publication) => (
          <Entry
            key={publication.title}
            title={publication.title}
            titleUrl={publication.url}
            period={publication.year}
          >
            <p className="mt-1 text-sm text-muted">{publication.authors}</p>
            {publication.venue && (
              <p className="text-sm text-faint">{publication.venue}</p>
            )}
          </Entry>
        ))}
      </Section>

      <Section title={ui.sections.awards} items={resume.awards}>
        {resume.awards.map((award) => (
          <Entry
            key={award.title}
            title={award.title}
            period={award.year}
            subtitle={award.issuer}
          >
            {award.detail && (
              <p className="mt-1 text-sm text-faint">{award.detail}</p>
            )}
          </Entry>
        ))}
      </Section>

      <footer className="border-t border-rule pt-6 text-sm text-faint" data-print="hide">
        <a
          href={resume.meta.pdf}
          download
          className="underline decoration-rule underline-offset-4 hover:text-accent"
        >
          {ui.downloadPdf}
        </a>
      </footer>
    </main>
  );
}
