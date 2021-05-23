export function convertStarCount(width, count) {
  return Math.floor((width / 10) * count);
}

export function randomStarSize(size) {
  return (Math.random() / 5) * size;
}

export function randomShootingStarSize(size) {
  return (Math.random() / 2) * size;
}

export function randomStarOpacity() {
  return Math.floor(Math.random() * 100);
}

export function randomStarColor() {
  const number = Math.floor((Math.random() + 0.3) * 12);

  // ornage
  if (number === 3) return '#FFA500';
  // gold
  else if (number === 4) return '#FFD700';
  // purple
  else if (number === 5) return '#800080';
  // green
  else if (number === 6) return '#008000';
  // sky blue
  else if (number === 7) return '#87CEEB';
  // white
  else return '#FFFFFF';
}
