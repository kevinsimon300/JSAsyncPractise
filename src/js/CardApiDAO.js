/**
 * Get random cards from the pokeapi
 * @param numberOfCards
 * @returns {Promise<Awaited<unknown>[]>}
 */
async function getRandomCard(numberOfCards) {
  const maxPokemonId = 898;
  const promises = [];
  for (let i = 0; i < numberOfCards / 2; i += 1) {
    const pokemonId = Math.floor(Math.random() * maxPokemonId) + 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    promises.push(
      fetch(url)
        .then((response) => response.json())
        .then((data) => ({ pokemonId, image: data.sprites.front_default })),
    );
  }
  return Promise.all(promises);
}

export { getRandomCard };
