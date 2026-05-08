
import AdvancedFeatures from "../components/cta";
import CyberpunkHero from "../components/hero-sections";
import MiransasSSMFinal from "../components/landing";
import { LenisProvider } from "../components/provider/lenis-provider";
import SynthChatUI from "../components/syntax-chat";


export default function Page() {
  return  (
   <LenisProvider>
     <main className="scroll-smooth">
       <CyberpunkHero />
       <MiransasSSMFinal/>
       <AdvancedFeatures/>
       <SynthChatUI/>
    </main>
   </LenisProvider>
   
  );
}
