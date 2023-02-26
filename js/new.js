const checkingLocalStorage = () => {
  let targetDate = localStorage.getItem(`targetDate`);
  if (targetDate) {
    targetDate = JSON.parse(targetDate);
  }

  return targetDate;
};

const getDuration = (dateObj) => {
  if (dateObj) {
    let date = dateObj.day;
    let month = dateObj.month;
    let year = dateObj.year;
    let hour = dateObj.hours;
    let minute = dateObj.minutes;

    const currentDate = new Date();
    const targetDate = new Date();

    targetDate.setFullYear(year, month - 1, date);
    targetDate.setHours(hour, minute, 0);

    let duration = targetDate - currentDate;
    duration = duration / 1000;

    return duration;
  }
};

const getTimeLeft = (second) => {
  if (second) {
    let minutes = second / 60;
    let hours = minutes / 60;
    let days = hours / 24;
    days = Math.floor(days);

    let seconds = second % 60;
    seconds = Math.floor(seconds);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    minutes = minutes % 60;
    minutes = Math.floor(minutes);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    hours = hours % 24;
    hours = Math.floor(hours);
    if (hours < 10) {
      hours = `0${hours}`;
    }

    const timeLeft = {
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
    };

    return timeLeft;
  }
};

const showTimeLeft = (timeLeft) => {
  if (timeLeft) {
    const daysNum = document.querySelector(`.countdown__daysnum`);
    const hrsNum = document.querySelector(`.countdown__hrsnum`);
    const minNum = document.querySelector(`.countdown__minnum`);
    const secNum = document.querySelector(`.countdown__secnum`);

    daysNum.innerHTML = timeLeft.days;
    hrsNum.innerHTML = timeLeft.hours;
    minNum.innerHTML = timeLeft.minutes;
    secNum.innerHTML = timeLeft.seconds;
  }
};

const setCountDownTarget = (dateObj) => {
  if (dateObj) {
    const target = document.querySelector(`.countdown-target`);
    target.style.color = `var(--TEXTCOLOR)`;

    const date = new Date();
    date.setFullYear(dateObj.year, dateObj.month - 1, dateObj.day);

    const day = date.getDay();
    const monthArray = [
      `January`,
      `February`,
      `March`,
      `April`,
      `May`,
      `June`,
      `July`,
      `August`,
      `September`,
      `October`,
      `November`,
      `December`,
    ];

    const daysArray = [
      `Sunday`,
      `Monday`,
      `Tuesday`,
      `Wednesday`,
      `Thursday`,
      `Friday`,
      `Saturday`,
    ];

    const month = monthArray[dateObj.month - 1];
    const weekday = daysArray[day];

    let targetString = `Counting down to ${dateObj.hours}:${dateObj.minutes}, ${weekday}, ${month} ${dateObj.day}, ${dateObj.year}`;

    target.innerHTML = targetString;
  }
};

const displayTimeLeft = (targetDate) => {
  const dateObj = targetDate;

  const duration = getDuration(dateObj);

  if (duration > 0) {
    const timeLeft = getTimeLeft(duration);

    showTimeLeft(timeLeft);
    setCountDownTarget(dateObj);
  } else {
    const target = document.querySelector(`.countdown-target`);

    target.style.color = `firebrick`;
    target.innerHTML = `Countdown has been reset or has expired! Please start a new countdown.`;
  }
};

const displayCountdown = () => {
  let targetDate = checkingLocalStorage();

  displayTimeLeft(targetDate);
};

// GETTING USER INPUT

const getUserInput = () => {
  const inputTime = document.querySelector(`.set-date__time`);
  const inputDate = document.querySelector(`.set-date__date`);

  let newTime = inputTime.value;
  newTime = newTime.split(`:`);

  const hrs = newTime[0];
  const mins = newTime[1];

  let newDay = inputDate.value;
  newDay = newDay.split(`-`);

  const year = newDay[0];
  const month = newDay[1];
  const day = newDay[2];

  const newDate = {
    hours: hrs,
    minutes: mins,
    year: year,
    month: month,
    day: day,
  };

  return newDate;
};

const rewriteLocalStorage = (newDate) => {
  const targetDate = JSON.stringify(newDate);
  localStorage.setItem(`targetDate`, targetDate);
};

// RESETTING COUNTDOWN

const resetCountdown = () => {
  localStorage.removeItem(`targetDate`);
};

// MAIN APP FLOW

const initApp = () => {
  setInterval(() => {
    displayCountdown();
  }, 1000);

  const startBtn = document.querySelector(`.set-date__start`);
  startBtn.onclick = (e) => {
    e.preventDefault();
    const newDate = getUserInput();

    rewriteLocalStorage(newDate);
  };

  const resetBtn = document.querySelector(`.set-date__reset`);
  resetBtn.onclick = (e) => {
    resetCountdown();
  };
};

initApp();
