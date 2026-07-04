import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BMverseLanding({ defaultSlide = "opening", lockToSlide = false }) {
  const slides = useMemo(
    () => [
      {
        key: "opening",
        eyebrow: "BMverse opening sequence",
        title: "Not just a currency. A complete digital world in motion.",
        text:
          "BMverse opens with a cinematic campaign-style slider built from the provided design language: deeper contrast, neon blue energy, and stronger visual storytelling from the first second.",
        backdropClass: "slide-backdrop",
      },
      {
        key: "ethereumx",
        eyebrow: "Ethereum-X",
        title: "Ethereum powers innovation across the globe.",
        text:
          "Ethereum-X is presented as BMverse’s intelligent chain layer: adaptive, efficiency-focused, and built for faster participation, lower friction, and a cleaner multi-chain experience.",
        backdropClass: "slide-backdrop slide-backdrop-earth",
      },
      {
        key: "antverse",
        eyebrow: "ANTverse",
        title: "Different people. One vision. One collectible universe.",
        text:
          "ANTverse expands BMverse into a world of entities, rarity, elements, and collectible identity, turning the ecosystem into something users can explore, own, and connect with.",
        backdropClass: "slide-backdrop slide-backdrop-antverse",
      },
    ],
    []
  );

  const startingIndex = Math.max(
    0,
    slides.findIndex((slide) => slide.key === defaultSlide)
  );
  const [activeSlide, setActiveSlide] = useState(startingIndex === -1 ? 0 : startingIndex);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  useEffect(() => {
    setActiveSlide(startingIndex === -1 ? 0 : startingIndex);
  }, [startingIndex]);

  useEffect(() => {
    if (lockToSlide) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [lockToSlide, slides.length]);

  const goToSlide = (index) => {
    setActiveSlide((index + slides.length) % slides.length);
  };

  return (
    <>
      <Head>
        <title>BMverse | Ethereum-X & ANTverse</title>
        <meta
          name="description"
          content="BMverse unifies Ethereum-X and ANTverse into one cinematic ecosystem website with a premium opening slider, richer world-building, and bmverse.us as the canonical domain."
        />
        <meta property="og:title" content="BMverse | Ethereum-X & ANTverse" />
        <meta
          property="og:description"
          content="Ethereum-X infrastructure, ANTverse world-building, and the BMverse leadership story in one premium landing experience."
        />
        <meta property="og:url" content="https://bmverse.us/" />
        <meta property="og:image" content="https://bmverse.us/images/c-level.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://bmverse.us/" />
      </Head>

      <div className="bmverse-site">
        <div className="page-shell">
          <div className="aurora aurora-one"></div>
          <div className="aurora aurora-two"></div>
          <div className="noise"></div>

          <header className="site-header">
            <a className="brand" href="#top" aria-label="BMverse home">
              <span className="brand-mark">BM</span>
              <span className="brand-copy">
                <strong>BMverse</strong>
                <small>Ethereum-X • ANTverse</small>
              </span>
            </a>

            <nav className="site-nav">
              <a href="#opening">Opening</a>
              <a href="#vision">Vision</a>
              <a href="#antverse">ANTverse</a>
              <a href="#team">Team</a>
              <a href="#launch">Launch</a>
            </nav>
          </header>

          <main id="top">
            <section id="opening" className="opening-slider section" data-aos="fade-up">
              <div className="slider-shell">
                <div className="slider-stage">
                  {slides.map((slide, index) => (
                    <article
                      key={slide.key}
                      className={`slide ${index === activeSlide ? "is-active" : ""}`}
                    >
                      <div className={slide.backdropClass}></div>
                      <div className="slide-copy">
                        <p className="eyebrow">{slide.eyebrow}</p>
                        {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
                        <p className="lead">{slide.text}</p>
                      </div>
                    </article>
                  ))}
                </div>

                {!lockToSlide && (
                  <div className="slider-controls">
                    <button className="slider-button" type="button" onClick={() => goToSlide(activeSlide - 1)}>
                      Prev
                    </button>
                    <div className="slider-indicators" aria-label="Slider indicators">
                      {slides.map((slide, index) => (
                        <button
                          key={slide.key}
                          className={`indicator ${index === activeSlide ? "is-active" : ""}`}
                          type="button"
                          onClick={() => goToSlide(index)}
                          aria-label={`Slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button className="slider-button" type="button" onClick={() => goToSlide(activeSlide + 1)}>
                      Next
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section className="hero section" data-aos="fade-up">
              <div className="hero-copy">
                <p className="eyebrow">Worlds • Elements • Mutation • Identity</p>
                <h2>BMverse now feels like a full ecosystem, not a single product page.</h2>
                <p className="lead">
                  The landing experience now connects Ethereum-X and ANTverse in one narrative.
                  Ethereum-X carries the infrastructure story, while ANTverse gives BMverse a world of
                  collectible identity, rarity, and visual culture that makes the ecosystem memorable.
                </p>

                <div className="hero-actions">
                  <a className="button button-primary" href="#antverse">
                    Explore ANTverse
                  </a>
                  <a className="button button-secondary" href="#team">
                    Meet the Team
                  </a>
                </div>

                <div className="hero-stats">
                  <article>
                    <strong>3,000+</strong>
                    <span>Ethereum-X throughput vision</span>
                  </article>
                  <article>
                    <strong>0.08 ETH</strong>
                    <span>ANTverse sample market energy</span>
                  </article>
                  <article>
                    <strong>bmverse.us</strong>
                    <span>canonical public domain</span>
                  </article>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-poster">
                  <div className="hero-poster-overlay"></div>
                  <div className="hero-poster-badge">QUANTUM</div>
                  <div className="hero-poster-copy">
                    <strong>THE NEW GENERATION OF ETHEREUM</strong>
                    <span>BMVERSE.US</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="vision" className="section split-section" data-aos="fade-up">
              <div className="section-heading">
                <p className="eyebrow">Ethereum-X — BMverse</p>
                <h2>A more cinematic message for a more ambitious ecosystem.</h2>
              </div>

              <div className="split-grid">
                <article className="glass-card">
                  <h3>Ethereum-X as the infrastructure layer</h3>
                  <p>
                    Ethereum-X is framed as BMverse’s performance engine: AI-assisted participation,
                    smarter contract behavior, adaptive execution, and a cleaner path for builders who
                    want a coordinated ecosystem instead of fragmented tooling and bridge-heavy flows.
                  </p>
                </article>
                <article className="glass-card">
                  <h3>BMverse as a living brand universe</h3>
                  <p>
                    The site no longer stops at technical claims. It connects protocol ambition with
                    identity, world-building, storytelling, and collectible culture so BMverse feels
                    premium, memorable, and ready for a broader public-facing launch.
                  </p>
                </article>
              </div>
            </section>

            <section className="section metrics-section" data-aos="fade-up">
              <div className="section-heading">
                <p className="eyebrow">Platform Snapshot</p>
                <h2>From chain performance to asset experiences.</h2>
              </div>

              <div className="metrics-table">
                <div className="metric-row metric-head">
                  <span>Layer</span>
                  <span>What it does</span>
                  <span>Why it matters</span>
                </div>
                <div className="metric-row">
                  <span>Ethereum-X</span>
                  <span>AI-enhanced participation and scalable execution</span>
                  <span>Supports faster, lower-friction blockchain experiences</span>
                </div>
                <div className="metric-row">
                  <span>Smart Context Contracts</span>
                  <span>Adaptive routing and execution logic</span>
                  <span>Improves efficiency and lowers operational waste</span>
                </div>
                <div className="metric-row">
                  <span>ANTverse</span>
                  <span>Entity-based collectible world with traits and rarity</span>
                  <span>Gives BMverse a visible, ownable, community-friendly universe</span>
                </div>
                <div className="metric-row">
                  <span>BMverse identity</span>
                  <span>Worlds, elements, mutation, and narrative design</span>
                  <span>Makes the brand distinct beyond token or protocol messaging</span>
                </div>
              </div>
            </section>

            <section id="antverse" className="section antverse-section" data-aos="fade-up">
              <div className="section-heading">
                <p className="eyebrow">ANTverse</p>
                <h2>A collectible world with identity, rarity, and elemental storytelling.</h2>
              </div>

              <div className="antverse-layout">
                <article className="antverse-feature">
                  <span className="spotlight-label">Featured world</span>
                  <h3>ANTverse gives BMverse a universe people can actually enter.</h3>
                  <p>
                    ANTverse changes BMverse from a blockchain message into a world-building brand.
                    The live ecosystem introduces entity-driven collectibles, rarity tiers, elemental
                    combinations, and market behavior that make the project feel active, tradable, and
                    emotionally resonant instead of purely technical.
                  </p>
                </article>

                <div className="antverse-grid">
                  <article className="feature-card">
                    <div className="feature-index">01</div>
                    <h3>Elemental identity</h3>
                    <p>
                      ANTverse assets can be framed around elemental and dual-element combinations,
                      giving the world a lore-friendly identity system that is easy to expand and brand.
                    </p>
                  </article>
                  <article className="feature-card">
                    <div className="feature-index">02</div>
                    <h3>Rarity and tiers</h3>
                    <p>
                      Rarity layers such as Genesis, Rare, Epic, Mythic, and Ascended give collectors
                      clearer value signals and give the ecosystem stronger product structure.
                    </p>
                  </article>
                  <article className="feature-card">
                    <div className="feature-index">03</div>
                    <h3>Market-facing energy</h3>
                    <p>
                      ANTverse supports a more dynamic public story because it feels like a living
                      market of entities rather than a passive NFT gallery or static brand mention.
                    </p>
                  </article>
                  <article className="feature-card">
                    <div className="feature-index">04</div>
                    <h3>Whole-ecosystem role</h3>
                    <p>
                      In this redesign, ANTverse is not treated as a side note. It is shown as one of
                      the core BMverse pillars alongside Ethereum-X and the broader identity system.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            <section id="team" className="section team-section" data-aos="fade-up">
              <div className="section-heading">
                <p className="eyebrow">Core Team</p>
                <h2>A sharper executive team section with real visual presence.</h2>
              </div>

              <div className="team-layout">
                <article className="team-spotlight">
                  <span className="spotlight-label">Leadership</span>
                  <h3>The leadership presentation now matches the cinematic visual direction.</h3>
                  <p>
                    Hesam Khalaj and Ehsan Larani now use real photo-led cards inside the repository
                    website, while Touraj Larani replaces the previous developer entry so the team
                    section reflects the updated BMverse structure you requested.
                  </p>
                </article>

                <div className="team-grid">
                  <article className="team-card">
                    <img className="member-photo" src="/images/hesam.jpg" alt="Hesam Khalaj" />
                    <h3>Hesam Khalaj</h3>
                    <p className="role">Founder & Architect</p>
                    <p>
                      Shapes the long-range product and infrastructure direction of BMverse, aligning
                      Ethereum-X with a larger ecosystem built on intelligence, scale, and identity.
                    </p>
                  </article>

                  <article className="team-card">
                    <img className="member-photo" src="/images/ehsan.jpg" alt="Ehsan Larani" />
                    <h3>Ehsan Larani</h3>
                    <p className="role">CFO & Strategy</p>
                    <p>
                      Leads strategic positioning, financial framing, and ecosystem-level narrative
                      development so the BMverse story reads clearly to partners and investors.
                    </p>
                  </article>

                  <article className="team-card">
                    <img className="member-photo" src="/images/touraj.jpg" alt="Touraj Larani" />
                    <h3>Touraj Larani</h3>
                    <p className="role">Ecosystem Operations</p>
                    <p>
                      Supports coordination across ecosystem growth, structure, and delivery, helping
                      the BMverse vision move from concept into a more organized operating reality.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            <section id="launch" className="section launch-section" data-aos="fade-up">
              <div className="launch-panel">
                <p className="eyebrow">Launch BMverse</p>
                <h2>The repository site now opens like a campaign, not just a page.</h2>
                <p>
                  The repo has been reworked around the BMverse domain and public-facing launch
                  narrative, with `bmverse.us` set as the canonical website reference throughout.
                </p>

                <div className="hero-actions">
                  <a className="button button-primary" href="https://bmverse.us" target="_blank" rel="noreferrer">
                    Visit bmverse.us
                  </a>
                  <a
                    className="button button-secondary"
                    href="https://github.com/beautifullminds/Ethereum-X--BMverse-"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Ethereum-X source
                  </a>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
