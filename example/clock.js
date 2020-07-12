const Clock = async () => {
    setTimeout({},1000);
    await setDate(Moment().tz('Asia/Seoul').format('YYYY/MM/DD'));
    await setTime(Moment().tz('Asia/Seoul').format('hh:mm:ss A'));
  }
  Clock();