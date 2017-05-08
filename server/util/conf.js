let redisKey = {
  _JOKE_HOT_: '_JOKE_HOT_',
  _JOKE_HOT_LONG_AGO_: '_JOKE_HOT_LONG_AGO_',
  _MSG_PUBLIC_: '_MSG_PUBLIC_',
  _MSG_PUBLIC_LONG_AGO_: '_MSG_PUBLIC_LONG_AGO_',
}

let ttl = {
  FIVE_MINS: 60 * 5,
}

module.exports = {
  redisKey: redisKey,
  ttl: ttl,
}
