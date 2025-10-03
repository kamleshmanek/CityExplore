export const formatBusinessHours = async (hoursString: string): Promise<string[]> => {
  const dayMap: Record<string, string> = {
    Mo: 'Monday',
    Tu: 'Tuesday',
    We: 'Wednesday',
    Th: 'Thursday',
    Fr: 'Friday',
    Sa: 'Saturday',
    Su: 'Sunday',
  };

  try {
    const result: string[] = [];
    const parts = hoursString.split(';').map(p => p.trim());

    parts.forEach(part => {
      const [days, times] = part.split(' ');
      const [start, end] = times.split('-');

      const dayRange = days.includes('-') ? days.split('-') : [days];

      if (dayRange.length === 2) {
        const keys = Object.keys(dayMap);
        const startIndex = keys.indexOf(dayRange[0]);
        const endIndex = keys.indexOf(dayRange[1]);
        for (let i = startIndex; i <= endIndex; i++) {
          result.push(`${dayMap[keys[i]]}: ${start} - ${end}`);
        }
      } else {
        result.push(`${dayMap[dayRange[0]]}: ${start} - ${end}`);
      }
    });

    return result;
  } catch (error) {
    console.log('formatBusinessHours error:', error);
    return [];
  }
};
