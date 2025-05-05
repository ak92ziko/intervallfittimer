export function formatTime(seconds: number): string {
  if (seconds < 0) seconds = 0;
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  // Return minutes and seconds with leading zeros
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeWithHundredths(timeInSeconds: number): string {
  if (timeInSeconds < 0) timeInSeconds = 0;
  
  const seconds = Math.floor(timeInSeconds);
  const hundredths = Math.floor((timeInSeconds - seconds) * 100);
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  // If time is under 5 seconds, show hundredths
  if (timeInSeconds < 5) {
    return `${secs}.${hundredths.toString().padStart(2, '0')}`;
  }
  
  // Otherwise show minutes and seconds
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}