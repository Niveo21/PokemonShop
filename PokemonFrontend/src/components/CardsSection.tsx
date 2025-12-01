import { useState } from "react";
import PokemonCard from "./PokemonCard";
import { Button } from "@/components/ui/button";
const pokemonCards = [{
  id: 1,
  name: "Charizard",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
  type: "fire",
  rarity: "ultra-rare",
  price: 299,
  originalPrice: 399
}, {
  id: 2,
  name: "Pikachu",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  type: "electric",
  rarity: "rare",
  price: 89
}, {
  id: 3,
  name: "Mewtwo",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
  type: "psychic",
  rarity: "legendary",
  price: 499,
  originalPrice: 599
}, {
  id: 4,
  name: "Blastoise",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
  type: "water",
  rarity: "ultra-rare",
  price: 249
}, {
  id: 5,
  name: "Venusaur",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
  type: "grass",
  rarity: "ultra-rare",
  price: 229
}, {
  id: 6,
  name: "Dragonite",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
  type: "dragon",
  rarity: "rare",
  price: 179,
  originalPrice: 219
}, {
  id: 7,
  name: "Gengar",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
  type: "dark",
  rarity: "rare",
  price: 149
}, {
  id: 8,
  name: "Sylveon",
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png",
  type: "fairy",
  rarity: "uncommon",
  price: 69
}];

const types = ["all", "fire", "water", "grass", "electric", "psychic", "dragon", "dark", "fairy"];
const CardsSection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const filteredCards = activeFilter === "all" ? pokemonCards : pokemonCards.filter(card => card.type === activeFilter);

  return <section id="cards" className="py-20 bg-background">
    <div className="container mx-auto px-4">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 bg-pokemon-red/10 text-pokemon-red rounded-full text-sm font-medium mb-4">
          Nuestra Colección
        </span>
        <h2 className="text-4xl md:text-5xl text-foreground tracking-wider mb-4 font-sans">
          Cartas Destacadas
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explora nuestra selección de cartas Pokémon más populares. Desde los clásicos hasta las ediciones más raras.
        </p>
      </div>

      {/* Filter butons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {types.map(type => <Button key={type} variant={activeFilter === type ? "pokemon" : "outline"} size="sm" onClick={() => setActiveFilter(type)} className={activeFilter === type ? "" : "border-border text-muted-foreground hover:text-foreground hover:border-pokemon-red"}>
          {type === "all" ? "Todos" : type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>)}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCards.map(card => <PokemonCard key={card.id} {...card} />)}
      </div>

      {/* Load more button */}
      <div className="text-center mt-12">
        <Button variant="pokemonYellow" size="lg" className="font-sans">
          Ver Más Cartas
        </Button>
      </div>
    </div>
  </section>;
};
export default CardsSection;