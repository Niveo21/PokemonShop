import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}
const Navbar = ({
  onLoginClick,
  onRegisterClick
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-pokemon-dark/95 backdrop-blur-md border-b border-pokemon-red/20">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">

        <div className="flex items-center gap-2">

          <span className="text-2xl text-primary-foreground tracking-wider font-serif">
            PokeCards
          </span>
        </div>


        <div className="hidden md:flex items-center gap-6">
          <a href="#cards" className="text-primary-foreground/80 hover:text-pokemon-yellow transition-colors font-medium">
            Cartas
          </a>
          <a href="#featured" className="text-primary-foreground/80 hover:text-pokemon-yellow transition-colors font-medium">
            Destacados
          </a>
          <a href="#about" className="text-primary-foreground/80 hover:text-pokemon-yellow transition-colors font-medium">
            Nosotros
          </a>
        </div>


        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-primary-foreground hover:text-pokemon-yellow hover:bg-transparent">
            <ShoppingCart className="w-5 h-5" />
          </Button>
          <Button variant="outline" onClick={onLoginClick} className="border-pokemon-yellow text-pokemon-yellow hover:bg-pokemon-yellow hover:text-pokemon-dark font-sans">
            Iniciar Sesión
          </Button>
          <Button variant="pokemonYellow" onClick={onRegisterClick} className="font-sans">
            Registrarse
          </Button>
        </div>


        <button className="md:hidden text-primary-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>


      {isMenuOpen && <div className="md:hidden py-4 border-t border-pokemon-red/20 animate-slide-up">
        <div className="flex flex-col gap-4">
          <a href="#cards" className="text-primary-foreground/80 hover:text-pokemon-yellow transition-colors font-medium">
            Cartas
          </a>
          <a href="#featured" className="text-primary-foreground/80 hover:text-pokemon-yellow transition-colors font-medium">
            Destacados
          </a>
          <a href="#about" className="text-primary-foreground/80 hover:text-pokemon-yellow transition-colors font-medium">
            Nosotros
          </a>
          <div className="flex flex-col gap-2 pt-4 border-t border-pokemon-red/20">
            <Button variant="outline" className="border-pokemon-yellow text-pokemon-yellow hover:bg-pokemon-yellow hover:text-pokemon-dark" onClick={onLoginClick}>
              Iniciar Sesión
            </Button>
            <Button variant="pokemonYellow" onClick={onRegisterClick}>
              Registrarse
            </Button>
          </div>
        </div>
      </div>}
    </div>
  </nav>;
};
export default Navbar;