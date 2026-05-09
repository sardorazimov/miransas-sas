

import { MiransasSecurityFeatures } from "../components/cta";
import { MiransasBentoGrid } from "../components/feature";



import Footer from "../components/footer";
import Header from "../components/header";

import MiransasHero from "../components/landing";
import { LaserSideDiagnostics } from "../components/LaserSideDiagnostics";

import { LenisProvider } from "../components/provider/lenis-provider";



export default function Page() {
  return (
    <LenisProvider>
      <main className="scroll-smooth">
        <Header />
        {/* <LaserHero/> */}
        <MiransasHero />
       <MiransasSecurityFeatures/>
        <MiransasBentoGrid/>
        <LaserSideDiagnostics/>
      </main>
      <Footer />
    </LenisProvider>

  );
}
