export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

export const getTodayDate = (): string => {
  return formatDate(new Date());
};

export const getWeekStart = (date: Date = new Date()): Date => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day;
  start.setDate(diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getWeekEnd = (date: Date = new Date()): Date => {
  const end = new Date(date);
  const day = end.getDay();
  const diff = end.getDate() + (6 - day);
  end.setDate(diff);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const getDatesInWeek = (date: Date = new Date()): string[] => {
  const start = getWeekStart(date);
  const dates: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i);
    dates.push(formatDate(currentDate));
  }
  
  return dates;
};

export const isToday = (dateString: string): boolean => {
  return dateString === getTodayDate();
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};