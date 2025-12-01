import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
interface HeroSectionProps {
  onExploreClick: () => void;
}
const HeroSection = ({
  onExploreClick
}: HeroSectionProps) => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pokemon-dark via-pokemon-dark to-pokemon-red/30">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pokemon-red/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pokemon-yellow/20 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: "1s"
      }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pokemon-blue/10 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: "2s"
      }} />
      </div>

      {/* Pokeball decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10">
        <div className="w-full h-full rounded-full border-[30px] border-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-pokemon-red" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary-foreground" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-foreground rounded-full border-[20px] border-pokemon-dark" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-pokemon-yellow/20 rounded-full px-4 py-2 mb-6 animate-scale-in">
            <Sparkles className="w-4 h-4 text-pokemon-yellow" />
            <span className="text-pokemon-yellow text-sm font-medium">¡Black Friday!</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl text-primary-foreground mb-6 tracking-wider animate-slide-up text-glow font-serif">
            ​¡Bienvenido a PokeCards!  
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto animate-slide-up" style={{
          animationDelay: "0.2s"
        }}>
            Descubre nuestra exclusiva colección de cartas Pokémon. Desde las más clásicas hasta las ediciones limitadas más codiciadas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{
          animationDelay: "0.4s"
        }}>
            <Button variant="pokemonYellow" size="xl" onClick={onExploreClick} className="font-sans">
              Explorar Cartas
            </Button>
            <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 font-sans">
              Ver Colección
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/10 animate-slide-up" style={{
          animationDelay: "0.6s"
        }}>
            <div>
              <div className="font-display text-3xl md:text-4xl text-pokemon-yellow">10K+</div>
              <div className="text-primary-foreground/60 text-sm">Cartas Disponibles</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-pokemon-yellow">5K+</div>
              <div className="text-primary-foreground/60 text-sm">Coleccionistas</div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-pokemon-yellow">10%</div>
              <div className="text-primary-foreground/60 text-sm">Autenticidad</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;