export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-950">
      <header className="relative z-10">
        <nav className="mx-auto flex max-w-6xl items-start px-6 pt-6" aria-label="Primary">
          <a
            href="#"
            className="flex h-20 w-20 flex-col justify-center rounded-lg bg-[var(--brand-studio)] px-2 text-left text-white shadow-lg"
          >
            <span className="text-[11px] font-semibold leading-tight">Doodlebyte</span>
            <span className="text-[9px] font-semibold leading-tight text-white/90">
              Design Studio
            </span>
          </a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden pb-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 -top-24 h-[520px] w-[520px] rounded-full border-[24px] border-[var(--doodle-stroke)] opacity-20" />
            <div className="absolute left-[5%] top-[10%] h-[720px] w-[720px] rounded-full border-[28px] border-[var(--doodle-stroke)] opacity-20" />
            <div className="absolute -right-64 top-10 h-[520px] w-[520px] rounded-full border-[18px] border-[var(--doodle-stroke)] opacity-15" />
          </div>

          <div className="mx-auto max-w-6xl px-6 pt-4">
            <div className="hero-panel px-8 py-12 md:px-12 md:py-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2 text-6xl font-semibold leading-none tracking-tight text-white md:text-7xl">
                    <span className="font-display">D</span>
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-white/70">
                      <span className="absolute left-[13px] top-[18px] h-2.5 w-2.5 rounded-full bg-white" />
                      <span className="absolute right-[13px] top-[18px] h-2.5 w-2.5 rounded-full bg-white" />
                    </span>
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-white/70">
                      <span className="absolute left-[13px] top-[18px] h-2.5 w-2.5 rounded-full bg-white" />
                      <span className="absolute right-[13px] top-[18px] h-2.5 w-2.5 rounded-full bg-white" />
                    </span>
                    <span className="font-display">dle</span>
                  </div>

                  <div className="max-w-xl text-2xl font-semibold leading-snug text-white md:text-3xl">
                    <span className="block">We Don&apos;t Just Build Software.</span>
                    <span className="block">
                      We Give It a{" "}
                      <span className="text-[var(--brand-soul)]">Soul</span>.
                    </span>
                  </div>

                  <div>
                    <a
                      className="inline-flex items-center gap-3 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-ink)] shadow-sm transition hover:translate-y-[-1px]"
                      href="#work"
                    >
                      View Work
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--brand-ink)] text-[var(--brand-ink)]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 17L17 7M9 7H17V15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>

                <div className="relative min-h-[300px]" aria-hidden="true">
                  <div className="pixel-block pixel-notch absolute right-6 top-8 h-28 w-48 rounded-2xl" />
                  <div className="pixel-block pixel-notch-alt absolute bottom-4 right-0 h-40 w-64 rounded-2xl" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16" id="branches">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                The DoodleByte Universe
              </p>
              <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
                Three focused branches, one bold identity.
              </h2>
            </div>
            <p className="max-w-xl text-base text-slate-600">
              We run a studio for product engineering, an education platform for
              learners, and a storytelling lab that is launching soon. Each
              branch has its own energy, but they all carry the same heart.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[var(--brand-studio)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-studio)]">
                  Studio
                </span>
                <span className="text-xs font-semibold text-slate-400">IT Services</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                DoodleByte Studio
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Web development, mobile apps, software solutions, UI/UX, and
                product strategy for ambitious teams.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Web Platforms
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Mobile Apps
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  SaaS Systems
                </span>
              </div>
            </article>

            <article
              className="fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              style={{ animationDelay: "0.08s" }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[var(--brand-education)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-education)]">
                  Education
                </span>
                <span className="text-xs font-semibold text-slate-400">Learning Hub</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                DoodleByte Education
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A collaborative learning community with free tutorials,
                articles, projects, and resources plus affordable courses.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Courses
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Tutorials
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Projects
                </span>
              </div>
            </article>

            <article
              className="fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              style={{ animationDelay: "0.16s" }}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[var(--brand-tales)]/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Tales
                </span>
                <span className="text-xs font-semibold text-slate-400">Coming Soon</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                DoodleByte Tales
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A storytelling and media lab for future originals, lore, and
                immersive narratives. Launching soon.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Originals
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Animation
                </span>
                <span className="rounded-full border border-slate-200 px-3 py-1">
                  Story Worlds
                </span>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-[var(--surface)]" id="work">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Featured Work
                </p>
                <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
                  Design-forward products that feel alive.
                </h2>
              </div>
              <p className="max-w-xl text-base text-slate-600">
                We create purposeful interfaces, build scalable platforms, and
                ship products that are ready to grow with you.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Civic SaaS Platform",
                  type: "Web Experience",
                  color: "bg-[var(--brand-studio)]",
                },
                {
                  title: "Learning Hub Revamp",
                  type: "EdTech System",
                  color: "bg-[var(--brand-education)]",
                },
                {
                  title: "Immersive Story Lab",
                  type: "Media Product",
                  color: "bg-[var(--brand-tales)]",
                },
              ].map((item, index) => (
                <article
                  key={item.title}
                  className="fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1"
                  style={{ animationDelay: `${0.06 * index}s` }}
                >
                  <div
                    className={`h-12 w-12 rounded-2xl ${item.color} text-white`}
                  />
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {item.type}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600">
                    Strategy, interface design, and product engineering aligned
                    to the brand story.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16" id="products">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                Products
              </p>
              <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
                Built in-house, loved by the community.
              </h2>
              <p className="mt-4 text-base text-slate-600">
                DoodleByte Studio ships digital products that solve real
                problems for teams and creators.
              </p>
            </div>
            <div className="grid gap-4">
              <article className="fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">Zcan</h3>
                  <span className="rounded-full bg-[var(--brand-studio)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-studio)]">
                    zcan.in
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Document workflows and smart scanning built for speed.
                </p>
                <div className="mt-4 text-sm font-semibold text-slate-700">
                  goldenmess.zcan.in
                </div>
              </article>
              <article
                className="fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                style={{ animationDelay: "0.08s" }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-slate-900">Azign</h3>
                  <span className="rounded-full bg-[var(--brand-studio)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand-studio)]">
                    azign.app
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Design collaboration and review workflows for modern teams.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[var(--surface-strong)]" id="education">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  DoodleByte Education
                </p>
                <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
                  A learning community built for momentum.
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Welcome to DoodleByte Education. We are not just a course
                  platform or a material-sharing space. This is a collaborative
                  learning community where people share knowledge, support one
                  another, and grow beyond traditional textbooks.
                </p>
                <p className="mt-4 text-base text-slate-600">
                  Our learning hub offers courses, tutorials, articles,
                  projects, and resources. Tutorials, articles, projects, and
                  learning resources are completely free to access for everyone
                  who wants to learn, explore, and practice independently.
                </p>
                <p className="mt-4 text-base text-slate-600">
                  Paid courses are introduced only to support the growth and
                  sustainability of the community, priced between 49 and 199.
                </p>
              </div>
              <div className="fade-up rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  What learners receive
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  <li>Interactive live classes via online meetings.</li>
                  <li>18/7 mentor support with lifetime doubt-clearing.</li>
                  <li>Recorded class access for continuous learning.</li>
                  <li>Academic support for school and college subjects.</li>
                </ul>
                <div className="mt-6 rounded-2xl bg-[var(--brand-education)]/10 p-4 text-sm text-[var(--brand-education)]">
                  Everything else in the learning hub remains free for all
                  learners.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16" id="tales">
          <div className="fade-up rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
                  DoodleByte Tales
                </p>
                <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
                  A storytelling lab for the future.
                </h2>
                <p className="mt-4 text-base text-slate-600">
                  Tales is our coming-soon branch that focuses on narrative
                  worlds, digital storytelling, and bold creative originals.
                </p>
              </div>
              <div className="rounded-3xl bg-[var(--brand-tales)]/25 p-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
                  Coming Soon
                </p>
                <p className="mt-4 text-2xl font-semibold text-amber-900">
                  Yellow, playful, and full of story.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--brand-ink)]" id="contact">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div>
                <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
                  Ready to build something with soul?
                </h2>
                <p className="mt-4 text-base text-white/70">
                  Tell us about your product, your learning mission, or your
                  next story world. We will respond with a tailored plan.
                </p>
              </div>
              <div className="fade-up rounded-3xl bg-white p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Contact
                </p>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  hello@doodlebyte.in
                </p>
                <p className="mt-4 text-sm text-slate-600">
                  DoodleByte Studio | Education | Tales
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500">
          <p>© 2026 DoodleByte. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a className="hover:text-slate-700" href="#branches">
              Branches
            </a>
            <a className="hover:text-slate-700" href="#products">
              Products
            </a>
            <a className="hover:text-slate-700" href="#education">
              Education
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
