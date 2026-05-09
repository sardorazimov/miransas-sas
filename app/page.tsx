
import MiransasCTA from "../components/cta";
import AdvancedFeatures from "../components/cta";
import Footer from "../components/footer";
import Header from "../components/header";
import CyberpunkHero from "../components/hero-sections";
import MiransasHero from "../components/landing";
import MiransasSSMFinal from "../components/landing";
import LaserHero from "../components/laser";
import { LenisProvider } from "../components/provider/lenis-provider";
import SynthChatUI from "../components/syntax-chat";


export default function Page() {
  return  (
   <LenisProvider>
     <main className="scroll-smooth">
      <Header/>
       {/* <LaserHero/> */}
       <MiransasHero/>
       <MiransasCTA/>
     
    </main>
    <Footer/>
   </LenisProvider>
   
  );
}
