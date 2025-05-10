export function isTimeRangeWithin(start1, end1, start2, end2) {
  const format = "HH:mm";
  const s1 = window.dayjs(start1, format);
  const e1 = window.dayjs(end1, format);
  const s2 = window.dayjs(start2, format);
  const e2 = window.dayjs(end2, format);
  // @ts-ignore
  return s1.isSameOrAfter(s2) && e1.isSameOrBefore(e2);
}
