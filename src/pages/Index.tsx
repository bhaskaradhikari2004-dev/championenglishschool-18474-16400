import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Baby, Clock, Eye, Heart, Lightbulb, MapPin, Phone, Quote, Target, Users } from "lucide-react";
import { WelcomePopup } from "@/components/WelcomePopup";
import { supabase } from "@/integrations/supabase/client";
import heroSchool from "@/assets/hero-school.jpg";
import aboutStudents from "@/assets/about-students.jpg";
import aboutExcellence from "@/assets/about-excellence.jpg";
import aboutCommunity from "@/assets/about-community.jpg";
import aboutHolistic from "@/assets/about-holistic.jpg";
import childcareClassroom from "@/assets/childcare-classroom.jpg";
import childcareActivities from "@/assets/childcare-activities.jpg";

interface AboutInfo {
  mission: string;
  vision: string;
  values: string;
  welcome_title: string;
  welcome_description: string;
}

interface Leader {
  id: string;
  name: string;
  position: string;
  message: string;
  image_url?: string;
}

const values = [
  { icon: Award, title: "Academic Excellence", text: "Focused teaching guided by experienced educators.", image: aboutExcellence, position: "object-center" },
  { icon: Users, title: "Strong Community", text: "A supportive school culture where every learner belongs.", image: aboutCommunity, position: "object-[center_30%]" },
  { icon: Lightbulb, title: "Holistic Development", text: "Opportunities that develop confidence, creativity and character.", image: aboutHolistic, position: "object-[center_35%]" },
];

const Index = () => {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    const loadHomepage = async () => {
      const [aboutResult, leaderResult] = await Promise.all([
        supabase.from("about_info").select("mission, vision, values, welcome_title, welcome_description").single(),
        supabase.from("leadership").select("id, name, position, message, image_url").eq("is_active", true).ilike("position", "%principal%").order("display_order", { ascending: true }).limit(1),
      ]);

      if (aboutResult.data) setAboutInfo(aboutResult.data);
      if (leaderResult.data) setLeaders(leaderResult.data);
      if (aboutResult.error) console.error("Error fetching about info:", aboutResult.error);
      if (leaderResult.error) console.error("Error fetching leaders:", leaderResult.error);
    };

    loadHomepage();
  }, []);

  const principal = leaders[0];

  return (
    <Layout>
      <WelcomePopup />

      <section className="relative isolate min-h-[520px] overflow-hidden bg-primary md:min-h-[650px]">
        <img src={heroSchool} alt="Champion English School building" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container relative z-10 flex min-h-[520px] items-end px-4 pb-12 pt-24 md:min-h-[650px] md:pb-20">
          <div className="max-w-3xl animate-fade-in text-primary-foreground">
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] md:text-sm">
              <span className="h-px w-10 bg-accent" />
              Learning with purpose in Dharan
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">Champion English School</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-xl">
              Unleashing the Champion within everyone through education, character and community.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/about">Discover our school <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 bg-background/10 text-primary-foreground hover:bg-background hover:text-foreground">
                <Link to="/contact">Contact us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-primary text-primary-foreground" aria-label="School highlights">
        <div className="container grid grid-cols-2 px-4 md:grid-cols-4">
          {[
            ["About", "Our story", "/about"],
            ["Academic", "Results & notices", "/results"],
            ["Community", "Events & gallery", "/gallery"],
            ["Child Care", "Play, learn & grow", "/childcare"],
          ].map(([label, text, href]) => (
            <Link key={label} to={href} className="group border-primary-foreground/15 px-4 py-5 transition-colors hover:bg-primary-foreground/10 md:border-r md:px-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-accent">{label}</span>
              <span className="mt-1 flex items-center gap-2 text-sm font-medium md:text-base">{text}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      {principal && (
        <section className="section-space bg-background">
          <div className="container grid items-center gap-8 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div className="relative mx-auto w-full max-w-md">
              {principal.image_url ? (
                <img src={principal.image_url} alt={principal.name} className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center bg-muted"><Users className="h-16 w-16 text-muted-foreground" /></div>
              )}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-4 border-r-4 border-accent" aria-hidden="true" />
            </div>
            <div>
              <p className="section-kicker">From our leadership</p>
              <h2 className="section-title">Message from the {principal.position}</h2>
              <Quote className="my-5 h-9 w-9 text-accent" aria-hidden="true" />
              <p className="line-clamp-6 text-base leading-8 text-muted-foreground md:text-lg">{principal.message}</p>
              <div className="mt-6 border-l-2 border-accent pl-4">
                <p className="font-heading text-xl font-bold">{principal.name}</p>
                <p className="text-sm text-muted-foreground">{principal.position}</p>
              </div>
              <Button asChild variant="link" className="mt-5 h-auto p-0 text-primary">
                <Link to="/leadership">Read the full message <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="section-space bg-muted/50">
        <div className="container px-4">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="section-kicker">About Champion</p>
              <h2 className="section-title">{aboutInfo?.welcome_title || "Nurturing Future Champions"}</h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">{aboutInfo?.welcome_description || "At Champion English School, we provide quality education that shapes character, builds confidence and prepares students for success."}</p>
              <Button asChild variant="outline" className="mt-6"><Link to="/about">Our school story <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
            <div className="lg:col-span-7">
              <img src={aboutStudents} alt="Students learning at Champion English School" className="aspect-[16/9] w-full object-cover" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {values.map((item) => (
              <article key={item.title} className="group overflow-hidden border bg-card">
                <img src={item.image} alt={item.title} className={`h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${item.position}`} />
                <div className="p-5">
                  <item.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-3 font-heading text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid border bg-card md:grid-cols-3">
            {[
              { icon: Target, title: "Our Mission", text: aboutInfo?.mission || "Provide holistic education that develops excellence and character." },
              { icon: Eye, title: "Our Vision", text: aboutInfo?.vision || "Be a leading institution nurturing confident global citizens." },
              { icon: Heart, title: "Our Values", text: aboutInfo?.values || "Excellence, integrity, respect and innovation." },
            ].map((item) => (
              <div key={item.title} className="border-b p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                <h3 className="mt-4 font-heading text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="container px-4">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="section-kicker">A confident beginning</p>
              <h2 className="section-title">Champion Child Care Centre</h2>
              <p className="mt-4 leading-7 text-muted-foreground">A caring place to play, learn and grow, with practical activities, healthy meals and a quiet home-like environment.</p>
            </div>
            <Button asChild><Link to="/childcare">Explore Child Care <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="grid gap-4 md:grid-cols-12">
            <img src={childcareClassroom} alt="Champion Child Care classroom" className="h-72 w-full object-cover md:col-span-7 md:h-[430px]" />
            <div className="grid gap-4 md:col-span-5">
              <img src={childcareActivities} alt="Children enjoying learning activities" className="h-48 w-full object-cover md:h-52" />
              <div className="flex flex-col justify-between bg-accent p-6 text-accent-foreground">
                <div>
                  <Baby className="h-7 w-7" aria-hidden="true" />
                  <h3 className="mt-4 font-heading text-2xl font-bold">Open for enrollment</h3>
                  <p className="mt-2 text-sm leading-6 text-accent-foreground/85">Breakfast, lunch and dinner · learning by doing · in-school medical nurse.</p>
                </div>
                <a href="tel:9814350277" className="mt-5 inline-flex items-center gap-2 font-semibold">Call 9814350277 <Phone className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-10 text-primary-foreground md:py-14">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Get in touch</p>
              <h2 className="mt-2 font-heading text-3xl font-bold">Visit Champion English School</h2>
            </div>
            <div className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" /><div><p className="font-semibold">Bargachhi, Dharan, Nepal</p><p className="text-sm text-primary-foreground/70">Come and meet our school community</p></div></div>
            <div className="flex gap-3"><Clock className="mt-1 h-5 w-5 shrink-0 text-accent" /><div><p className="font-semibold">Sunday–Friday</p><p className="text-sm text-primary-foreground/70">10:00 AM–4:00 PM</p></div></div>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/contact">Send a message</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
