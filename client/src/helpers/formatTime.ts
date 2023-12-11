export function formatTime(inputTime : string) {
    const date = new Date(inputTime);
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }