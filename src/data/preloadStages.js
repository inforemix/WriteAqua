import { getAssetPath } from '../utils/assets';

// Preloaded stages for Easy mode
export const easyStages = [
  {
    id: 1001,
    name: 'Fire',
    image: getAssetPath('puzzles/easy/fire.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1002,
    name: 'Ground',
    image: getAssetPath('puzzles/easy/ground.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1003,
    name: 'Human',
    image: getAssetPath('puzzles/easy/human.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1004,
    name: 'Light',
    image: getAssetPath('puzzles/easy/light.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1005,
    name: 'Moon',
    image: getAssetPath('puzzles/easy/moon.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1006,
    name: 'Mountain',
    image: getAssetPath('puzzles/easy/mountain.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1007,
    name: 'Rain',
    image: getAssetPath('puzzles/easy/rain.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1008,
    name: 'Rock',
    image: getAssetPath('puzzles/easy/rock.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1009,
    name: 'Sky',
    image: getAssetPath('puzzles/easy/sky.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1010,
    name: 'Sun',
    image: getAssetPath('puzzles/easy/sun.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1011,
    name: 'Water',
    image: getAssetPath('puzzles/easy/water.jpg'),
    mode: 'easy',
    difficulty: 3
  },
  {
    id: 1012,
    name: 'Wood',
    image: getAssetPath('puzzles/easy/wood.jpg'),
    mode: 'easy',
    difficulty: 3
  }
];

// Preloaded stages for Hard mode
export const hardStages = [
  {
    id: 2001,
    name: 'Autumn',
    image: getAssetPath('puzzles/hard/autumn.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2002,
    name: 'Beauty',
    image: getAssetPath('puzzles/hard/beauty.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2003,
    name: 'Danger',
    image: getAssetPath('puzzles/hard/danger.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2004,
    name: 'Kindness',
    image: getAssetPath('puzzles/hard/kindness.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2005,
    name: 'Love',
    image: getAssetPath('puzzles/hard/love.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2006,
    name: 'Ocean',
    image: getAssetPath('puzzles/hard/ocean.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2007,
    name: 'Spring',
    image: getAssetPath('puzzles/hard/spring.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2008,
    name: 'Star',
    image: getAssetPath('puzzles/hard/star.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2009,
    name: 'Summer',
    image: getAssetPath('puzzles/hard/summer.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2010,
    name: 'True',
    image: getAssetPath('puzzles/hard/true.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2011,
    name: 'Land',
    image: getAssetPath('puzzles/hard/land.jpg'),
    mode: 'hard',
    difficulty: 3
  },
  {
    id: 2012,
    name: 'Winter',
    image: getAssetPath('puzzles/hard/winter.jpg'),
    mode: 'hard',
    difficulty: 3
  }
];

// Combine all preloaded stages
export const defaultStages = [...easyStages, ...hardStages];
