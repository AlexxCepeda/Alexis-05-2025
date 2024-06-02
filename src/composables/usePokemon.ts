export function usePokemon() {
  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  return {
    playSound,
  };
}
