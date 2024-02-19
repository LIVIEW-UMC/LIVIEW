import moment from 'moment';

function TimeDiff(time) {
  const timeData = `${time}Z`;
  const targetTime = moment(timeData);

  const currentTime = moment();

  const years = currentTime.diff(targetTime, 'years');
  targetTime.add(years, 'years');

  const months = currentTime.diff(targetTime, 'months');
  targetTime.add(months, 'months');

  const days = currentTime.diff(targetTime, 'days');
  targetTime.add(days, 'days');

  const hours = currentTime.diff(targetTime, 'hours');
  targetTime.add(hours, 'hours');

  const minutes = currentTime.diff(targetTime, 'minutes');
  targetTime.add(minutes, 'minutes');

  const seconds = currentTime.diff(targetTime, 'seconds');

  let diff;
  if (!(years === 0)) {
    diff = `${years}년 전`;
  } else if (!(months === 0)) {
    diff = `${months}달 전`;
  } else if (days / 7 >= 1) {
    diff = `${days % 7}주 전`;
  } else if (!(days === 0)) {
    diff = `${days}일 전`;
  } else if (!(hours === 0)) {
    diff = `${hours}시간 전`;
  } else if (!(minutes === 0)) {
    diff = `${minutes}분 전`;
  } else {
    diff = `${seconds}초 전`;
  }

  return diff;
}

export default TimeDiff;
