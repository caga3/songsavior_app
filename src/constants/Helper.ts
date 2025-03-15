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

export const timeAgo = (dbTime: string): string => {
  // Convert "YYYY-MM-DD HH:mm:ss" to "YYYY-MM-DDTHH:mm:ss"
  const formattedDate = dbTime.replace(' ', 'T');
  // Create a Date object assuming the timestamp is in UTC
  const pastDate = new Date(formattedDate + 'Z'); // 'Z' makes it UTC
  // Get current time
  const now = new Date();
  // Get the difference in milliseconds
  const diffInMs = now.getTime() - pastDate.getTime();
  // Convert to seconds
  const diffInSec = Math.floor(diffInMs / 1000);
  // Define time intervals
  const intervals: {label: string; seconds: number}[] = [
    {label: 'year', seconds: 31536000},
    {label: 'month', seconds: 2592000},
    {label: 'week', seconds: 604800},
    {label: 'day', seconds: 86400},
    {label: 'hour', seconds: 3600},
    {label: 'minute', seconds: 60},
    {label: 'second', seconds: 1},
  ];
  // Find the right interval
  for (const interval of intervals) {
    const count = Math.floor(diffInSec / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'Just now';
};

// Example Usage
//const dbTime = '2025-02-25 23:52:40'; // Database time (UTC)
//const relativeTime = timeAgo(dbTime);

//console.log(relativeTime); // Example Output: "5 minutes ago", "2 days ago", etc.

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
