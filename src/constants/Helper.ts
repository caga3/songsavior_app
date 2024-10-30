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

export const singleAccuracy = (vote: number, avgVote: number): number => {
  return 100 - Math.abs(vote - avgVote) * 20;
};

export const getAverage = (ratings: []): number => {
  const numberOfSongs = ratings.length;
  return ratings.reduce((a, b) => a + b, 0) / numberOfSongs;
};

export const sortWithMiddleFirst = (arr: any) => {
  if (arr.length === 0) {
    return arr;
  }
  const firstThree = arr.slice(0, 3);
  const reordered = [firstThree[1], firstThree[0], firstThree[2]];
  return reordered;
};
