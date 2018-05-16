import moment from 'moment'

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

function getTime2Now(data) {
  let time = moment().diff(moment(data)) / 1000;
  let result = '';
  if (time < 60) {
    result = `${Math.round(time)}秒前`;
  } else if (time < 60 * 60) {
    result = `${Math.round(time / 60)}分钟前`;
  } else if (time < 60 * 60 * 24) {
    result = `${Math.round(time / 60 / 60)}小时前`;
  } else {
    result = `${Math.round(time / 60 / 60 / 24)}天前`;
  }
  return result;
}

export default {
  getTime2Now
}

