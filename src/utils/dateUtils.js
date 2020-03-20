import parseISO from "date-fns/parseISO";
import fnAddDays from "date-fns/addDays";
import { utcToZonedTime } from "date-fns-tz";

export const parseDate = (date, timeZone = "Europe/Vilnius") => {
  return utcToZonedTime(parseISO(date), timeZone);
};

export const isInHourRange = number => {
  return number >= 0 && number < 24;
};

export const isValidHourRange = (start, end) => {
  return isInHourRange(start) && isInHourRange(end);
};

export const isValidTimeRange = (start, end) => {
  return start < end;
};

export const getDurationHours = (startHour, endHour) => {
  return endHour >= startHour ? endHour - startHour : 24 + endHour - startHour;
};

export const prettyFormatHour = (hour, usingTwelveHour) => {
  var prettyHour;
  if (usingTwelveHour) {
    var period = hour >= 12 ? "PM" : "AM";
    prettyHour = ((hour + 11) % 12) + 1 + ":00" + period;
  } else {
    var prefix = hour < 10 ? "0" : "";
    prettyHour = prefix + hour + ":00";
  }
  return prettyHour;
};

export const getMinDate = dates => {
  let minDate = dates[0];

  dates.forEach(date => {
    if (date < minDate) {
      minDate = date;
    }
  });

  return minDate;
};

export const getMinDateOrToday = dates => {
  const minDate = getMinDate(dates);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (minDate == null) {
    return today;
  }
  return getMaxDate([minDate, today]);
};

export const getMaxDate = dates => {
  let maxDate = dates[0];
  dates.forEach(date => {
    if (date > maxDate) {
      maxDate = date;
    }
  });
  return maxDate;
};

export const addDays = fnAddDays;
