import { Mail, MapPin, Phone } from "lucide-react";
const Footer = () => {
  return <footer className="bg-pokemon-dark text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              
              <span className="text-2xl tracking-wider font-serif">PokeCards</span>
            </div>
            <p className="text-primary-foreground/60 text-sm">
              Tu tienda de confianza para coleccionar las cartas Pokémon más exclusivas y raras del mercado.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg tracking-wider mb-4 text-pokemon-yellow font-sans">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#cards" className="text-primary-foreground/60 hover:text-pokemon-yellow transition-colors text-sm">Cartas</a></li>
              <li><a href="#featured" className="text-primary-foreground/60 hover:text-pokemon-yellow transition-colors text-sm">Destacados</a></li>
              <li><a href="#about" className="text-primary-foreground/60 hover:text-pokemon-yellow transition-colors text-sm">Nosotros</a></li>
              <li><a href="#faq" className="text-primary-foreground/60 hover:text-pokemon-yellow transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg tracking-wider mb-4 text-pokemon-yellow font-serif">Categorías</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/60 hover:text-pokemon-yellow transition-colors text-sm">Cartas Raras</a></li>
              <li><a href="#" className="text-primary-foreground/60 hover:text-pokemon-yellow transition-colors text-sm">Edición Limitada</a></li>
              <li><a href="#" className="text-primary-foreground/60 hover:text-pokemon-yellow transition-colors text-sm">Primera Generación</a></li>
              <li><a href="#" className="text-primary-foreground/60 hover:text-pokemon-yellow transition-colors text-sm">Ofertas</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg tracking-wider mb-4 text-pokemon-yellow font-serif">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <Mail className="w-4 h-4 text-pokemon-yellow" />
                info@pokecards.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <Phone className="w-4 h-4 text-pokemon-yellow" />
                +1 234 567 890
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <MapPin className="w-4 h-4 text-pokemon-yellow" />
                Ciudad Paleta, Kanto
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/40 text-sm">© 2024 PokéCards. Todos los derechos reservados. Nintendo no me denuncies.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;