const createCurDate = () => {
  const curDate = new Date();

  return `${curDate.getFullYear()}/${
    curDate.getMonth() + 1
  }/${curDate.getDate()}_${curDate.getHours()}:${curDate.getMinutes()}`;
};

export { createCurDate };
