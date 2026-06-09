import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Education } from "@/components/Education";
import { CodeStats } from "@/components/CodeStats";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Mohit Kumar — Full Stack Developer & AI Enthusiast" },
      { name: "description", content: "Cinematic 3D portfolio of Mohit Kumar — Full Stack Developer building scalable web apps, AI tools and immersive interfaces." },
      { property: "og:title", content: "Mohit Kumar — Full Stack Developer & AI Enthusiast" },
      { property: "og:description", content: "Cinematic 3D portfolio — scalable web apps, AI tools and immersive interfaces." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main className="relative">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Achievements />
              <Education />
              <CodeStats />
              <Contact />
            </main>
            <Footer />
          </SmoothScroll>
        </>
      )}
    </>
  );
}
