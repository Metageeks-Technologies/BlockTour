// export const formatDateTime = (dateString: string) => {
//   return new Date( dateString ).toLocaleString( "en-GB", {
//     timeZone: 'UTC',
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   });
// };

 export const formatDateTime = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

export const formatSecToMin = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(
    Number((seconds % 60).toFixed(2).padStart(5, "0"))
  );
  return `${minutes}:${remainingSeconds}`;
};
