export const GetTimeSinceDate = (date: Date, length: 'short' | 'long') => {
  const createdTimeInMilliseconsds = date.getTime();
  const today = new Date();
  const todayInMilliseconds = today.getTime();
  const timeInMilliseconds = todayInMilliseconds - createdTimeInMilliseconsds;
  const timeInHours = timeInMilliseconds / 3600000;
  const timeInMinutes = timeInMilliseconds / 60000;
  const timeInDays = timeInMilliseconds / 86400000;

  if (length === 'long') {
    if (Math.floor(timeInDays) === 1) {
      return `${Math.floor(timeInDays)} DAY AGO `;
    } else if (timeInDays > 1) {
      return `${Math.floor(timeInDays)} DAYS AGO `;
    } else {
      if (Math.floor(timeInHours) === 1) {
        return `${Math.floor(timeInHours)} HOUR AGO`;
      } else if (timeInHours > 1) {
        return `${Math.floor(timeInHours)} HOURS AGO`;
      } else {
        if (Math.floor(timeInMinutes) === 1) {
          return `${Math.floor(timeInMinutes)} MINUTE AGO`;
        } else {
          return `${Math.floor(timeInMinutes)} MINUTES AGO`;
        }
      }
    }
  } else {
    if (Math.floor(timeInDays) >= 1) {
      return `${Math.floor(timeInDays)}d`;
    } else if (Math.floor(timeInHours) >= 1) {
      return `${Math.floor(timeInHours)}h`;
    } else {
      return `${Math.floor(timeInMinutes)}m`;
    }
  }
};
