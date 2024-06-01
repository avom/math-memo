export function randomInt(range: number) {
  return Math.floor(range * Math.random());
}

export function shuffle<Type>(a: Type[]) {
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    const t = a[i];
    a[i] = a[j];
    a[j] = t;
  }
}