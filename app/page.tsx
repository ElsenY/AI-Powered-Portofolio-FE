import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { TerminalAnimation } from "@/components/terminal-animation";
import { AnimatedSection } from "@/components/animated-section";

const companies = [
  {
    name: "Bank INA",
    img: (
      <Image src="/bank_ina_logo.png" alt="Bank INA" width={500} height={500} />
    ),
    detail:
      "Working in Digital Banking team, building critical systems for BINA Digital apps, such as Virtual Account system, Fraud detection system, and more.",
    link: "https://bankina.co.id/",
  },
  {
    name: "Synapsis",
    img: (
      <Image src="/synapsis_logo.png" alt="Synapsis" width={500} height={500} />
    ),
    detail:
      "Developed Synapsis flagship product : Nearon, an IOT sensor monitoring application, here I developed core features and endpoint, such as creating sensor automations and healthcheck system",
    link: "https://synapsis.id/",
  },
  {
    name: "Tokopedia",
    img: (
      <Image
        src="/tokopedia_logo.png"
        alt="Tokopedia"
        width={700}
        height={700}
      />
    ),
    detail:
      "Worked in DB team, I am responsible in maintaining day to day activities of Tokopedia's Database and Redis, and also responsible in developing automations to improve efficiency of Database and Redis team.",
    link: "https://shop-id.tokopedia.com/",
  },
  {
    name: "Itemku",
    img: <Image src="/itemku_logo.png" alt="Itemku" width={500} height={500} />,
    detail:
      "Worked in Payment & Transaction service, I am responsible in building Itemku payment & transaction system, such as developing credit card payment system",
    link: "https://www.itemku.com/",
  },
  {
    name: "AGIT",
    img: <Image src="/agit_logo.png" alt="AGIT" width={500} height={500} />,
    detail:
      "Worked as frontend engineer, developing the Frontend of the new modern apps for a client and also maintaining the old existing apps.",
    link: "https://www.agit.co.id/",
  },
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center px-6">
        <div className="mx-auto max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <AnimatedSection delay={0}>
                  <p className="text-xl font-bold text-primary font-mono text-sm tracking-wider uppercase">
                    Elsen Yacub
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={100}>
                  <h1 className="text-4xl md:text-ss font-bold leading-tight text-balance">
                    Building Apps & Systems that actually matter
                  </h1>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                  <p className="text-lg text-muted-foreground sleading-relaxed max-w-xl">
                    I specialize in designing and implementing robust backend
                    systems, RESTful APIs, microservices, automations, and
                    database systems that handle millions of requests.
                  </p>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={300}>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/docs/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    View Resume
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/summary"
                    className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
                  >
                    View Summary
                  </Link>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div className="flex items-center gap-6 pt-4">
                  <a
                    href="https://github.com/elseny"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/elsenyacub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:elsenyacub@yahoo.co.id"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection
              delay={200}
              direction="right"
              className="hidden lg:block"
            >
              <TerminalAnimation />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trusted By Companies */}
      <section className="py-20 px-6 bg-background">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real Companies Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world experience solving real-world problems in many
              industriess
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
            {companies.map(({ name, img, detail, link }, index) => (
              <AnimatedSection key={name} delay={index * 80} className="h-full">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                  tabIndex={-1}
                >
                  <div className="relative bg-secondary/50 border border-border rounded-xl p-6 flex flex-col items-center justify-center shadow hover:shadow-lg overflow-hidden group transition-shadow h-full min-h-[230px]">
                    <div className="w-full h-full max-h-[100px] justify-center flex flex-col items-center relative z-10">
                      {img}
                    </div>
                    <div
                      className={`
                        absolute left-0 right-0 bottom-0 
                        bg-background border-t border-border px-4 py-3
                        text-xs text-muted-foreground z-20 rounded-b-xl
                        transform translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out
                        pointer-events-none group-hover:pointer-events-auto
                        shadow-lg
                      `}
                      style={{ minHeight: 80 }}
                    >
                      <p className="mb-2 text-base text-white text-balance">
                        {detail}
                      </p>
                      <span className="text-primary underline text-xs">
                        Learn more
                      </span>
                    </div>
                  </div>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={600} className="text-center mt-12">
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            View more details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </section>

      {/* Tech Stack Preview */}
      <section className="py-20 px-6 bg-card">
        <div className="mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Core Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert-level proficiency in modern technologies
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Go",
              "Node.js",
              "Kafka",
              "Redis",
              "PostgreSQL",
              "gRPC",
              "Next",
              "React",
              "Ansible",
              "Jenkins",
              "Docker",
              "MongoDB",
            ].map((tech, index) => (
              <AnimatedSection key={tech} delay={index * 50}>
                <div className="bg-secondary/50 border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                  <span className="font-mono text-sm">{tech}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={600} className="text-center mt-12">
            <Link
              href="/skills"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              View all skills
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "6+", label: "Years Experience" },
              { value: "50+", label: "Tech stacks used" },
              { value: "20+", label: "AI Tools utilized" },
              { value: "30+", label: "Complex Projects Completed" },
            ].map((stat, index) => (
              <AnimatedSection
                key={stat.label}
                delay={index * 100}
                className="text-center"
              >
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl text-center text-muted-foreground text-sm">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
