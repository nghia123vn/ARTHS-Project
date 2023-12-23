export const formatDateSeven = (dataString: string) => {
  return new Intl.DateTimeFormat('en-GB')
  .format(new Date(Date.parse(dataString) + 7 * 60 * 60 * 1000));
}

export const formatDateTime = (dataString: string) => {
  return new Intl.DateTimeFormat('en-GB', {
  }).format(new Date(Date.parse(dataString)));
}

export const formatDateFeedback = (inputDate: string) => {
  const date = new Date(Date.parse(inputDate) + 7 * 60 * 60 * 1000);

  // Lấy giờ và phút
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Lấy ngày, tháng và năm
  const day = date.getDate();
  // tháng bắt đầu từ 0
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Định dạng giờ và phút thành chuỗi hh:mm
  const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  // Định dạng ngày, tháng và năm thành chuỗi dd-MM-yyyy
  const dateStr = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

  // Kết hợp giờ và ngày
  const formattedDateTime = `${time} | ${dateStr}`;

  return formattedDateTime;
}