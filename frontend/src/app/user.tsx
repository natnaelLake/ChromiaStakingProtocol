const funnyAnimalNames = [
    "SneakyLlama",
    "CheekyMonkey",
    "LaughingPenguin",
    "CrazyKangaroo",
    "GigglingHedgehog",
    "WackyWalrus",
    "DancingDolphin",
    "BumblingBee",
    "HoppingHare",
    "SingingSeagull",
  ];
  
  export function getRandomUserName() {
    const randomIndex = Math.floor(Math.random() * funnyAnimalNames.length);
    return funnyAnimalNames[randomIndex];
  }