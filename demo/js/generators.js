export function generateUniquePhrase(length = 4) {
  const words = [
    "flower", "mountain", "river", "cloud", "ocean", 
    "forest", "desert", "bridge", "starlight", "garden"
  ];

  // Pick a random word from the list
  const randomWord = words[Math.floor(Math.random() * words.length)];

  // Generate a random number with the specified number of digits
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return `${randomNumber}${randomWord}`;
}

export function generateUUIDv4() {
  return crypto.randomUUID();
}