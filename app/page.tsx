
import CyberpunkHero from "../components/hero-sections";
import MiransasSSMFinal from "../components/landing";
import { LenisProvider } from "../components/provider/lenis-provider";


export default function Page() {
  return  (
   <LenisProvider>
     <main className="scroll-smooth">
       <CyberpunkHero />
       <MiransasSSMFinal/>
    </main>
   </LenisProvider>
   
  );
}
