export const formatTimestamp = (timestamp: number) => {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffTime = Math.abs(now.getTime() - messageDate.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60)); // Difference in minutes
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); // Difference in hours
  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate the difference in days
    return `${diffDays} days ago`;
  }
};

export const cleanText = (input: string): string => {
  if (!input) {
    return 'default'; // Return a default slug if text is empty, null, or undefined
  }
  return String(input).replace(/[^a-zA-Z0-9]/g, '');
};

export const slugText = (input: string): string => {
  if (!input) {
    return 'default'; // Return a default slug if text is empty, null, or undefined
  }
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '');
};

export const trimString = (input: string, maxLength: number = 49): string => {
  if (input) {
    if (input.length <= maxLength) {
      return input;
    } else {
      return input.slice(0, maxLength) + '...';
    }
  }
  return input;
};

export const sortWithMiddleFirst = (arr: any) => {
  if (arr.length === 0) {
    return arr;
  }
  const firstThree = arr.slice(0, 3);
  const reordered = [firstThree[1], firstThree[0], firstThree[2]];
  return reordered;
};

export const padNumber = (number: number) => {
  return String(number).padStart(10, '0');
};

// Get Song Accuracy
export const songAccuracy = (vote: number, avgVote: number): number => {
  return 100 - Math.abs(vote - avgVote) * 20;
};

export const formatTime = (durationInSeconds: number): string => {
  const totalSeconds = Math.floor(durationInSeconds % 60);
  const minutes = Math.floor(durationInSeconds / 60)
    .toString()
    .padStart(2, '0');
  const remainingSeconds = totalSeconds % 60; // Calculate remaining seconds correctly
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  return `${minutes}:${formattedSeconds}`;
};

export const format = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${mins}:${secs}`;
};

export const checkIfKeyExists = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      console.log(`Key "${key}" does not exist.`);
      return false; // Key does NOT exist
    } else {
      console.log(`Key "${key}" exists with value:`, value);
      return true; // Key exists
    }
  } catch (error) {
    console.error('Error checking key in AsyncStorage:', error);
    return false;
  }
};

// Get Overall Song Accuracy
// export const getOverallAccuracy = (ratings: {avg: string}[]): string => {
//   // Rating from 0 - 4
//   const rate = 4;
//   const numberOfSongs = ratings.length;
//   if (numberOfSongs === 0) {
//     return '0%';
//   }
//   const avgScore =
//     ratings.reduce((sum, item) => sum + parseFloat(item.avg), 0) /
//     numberOfSongs;
//   const percentage = (avgScore / rate) * 100; // Normalize to 0-100%
//   return `${percentage.toFixed(2)}%`;
// };

// // Get Overall Song Scores
// export const getTotalSongScores = (scores: {score: string}[]): number => {
//   const numberOfSongs = scores.length;
//   if (numberOfSongs === 0) {
//     return 0;
//   }
//   const score = scores.reduce((sum, item) => sum + parseFloat(item.score), 0);
//   return parseFloat(score.toFixed(2));
// };
