export default function countDaysLeft(from: Date, to: Date) {
  const today = new Date();

  if (!from || !to) return 0;
  if (today < from || today > to) return 0;

  const diffTime = to.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
