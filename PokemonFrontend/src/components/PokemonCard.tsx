import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  type: string;
  rarity: string;
  price: number;
  originalPrice?: number;
}
const typeColors: Record<string, string> = {
  fire: "from-orange-500 to-red-600",
  water: "from-blue-400 to-blue-600",
  grass: "from-green-400 to-green-600",
  electric: "from-yellow-400 to-yellow-500",
  psychic: "from-pink-400 to-purple-500",
  dragon: "from-indigo-500 to-purple-600",
  dark: "from-gray-600 to-gray-800",
  fairy: "from-pink-300 to-pink-500",
  normal: "from-gray-300 to-gray-500"
};
const rarityStars: Record<string, number> = {
  common: 1,
  uncommon: 2,
  rare: 3,
  "ultra-rare": 4,
  legendary: 5
};
const PokemonCard = ({
  id,
  name,
  image,
  type,
  rarity,
  price,
  originalPrice
}: PokemonCardProps) => {
  const {
    toast
  } = useToast();
  const gradientClass = typeColors[type] || typeColors.normal;
  const stars = rarityStars[rarity] || 1;
  const handleAddToCart = () => {
    toast({
      title: "¡Añadido al carrito!",
      description: `${name} ha sido añadido a tu carrito`
    });
  };
  return <div className="group relative">
      <div className="pokemon-card-shine relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2">
        
        <div className={`h-32 bg-gradient-to-br ${gradientClass} relative`}>
          {/* Rarity badge */}
          <div className="absolute top-3 right-3 flex gap-0.5">
            {[...Array(stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-pokemon-yellow text-pokemon-yellow" />)}
          </div>
          
          {/* Discount badge */}
          {originalPrice && <div className="absolute top-3 left-3 bg-pokemon-red text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              -{Math.round((1 - price / originalPrice) * 100)}%
            </div>}
        </div>

        {/* Pokemon image */}
        <div className="relative -mt-16 mb-4 flex justify-center">
          <div className="w-28 h-28 rounded-full bg-card shadow-lg flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-500">
            <img src={image} alt={name} className="w-full h-full object-contain animate-float" loading="lazy" />
          </div>
        </div>

        {/* Card content */}
        <div className="px-4 pb-4">
          <div className="text-center mb-3">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${gradientClass} text-primary-foreground capitalize`}>
              {type}
            </span>
          </div>

          <h3 className="text-xl text-center text-card-foreground tracking-wide mb-2 capitalize font-serif">
            {name}
          </h3>

          <p className="text-xs text-muted-foreground text-center capitalize mb-4">
            {rarity.replace("-", " ")}
          </p>

          {/* Precio */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="font-display text-2xl text-pokemon-red">${price}</span>
            {originalPrice && <span className="text-muted-foreground line-through text-sm">${originalPrice}</span>}
          </div>

          <Button variant="pokemon" onClick={handleAddToCart} className="w-full font-sans">
            <ShoppingCart className="w-4 h-4" />
            Añadir al Carrito
          </Button>
        </div>
      </div>
    </div>;
};
export default PokemonCard;
