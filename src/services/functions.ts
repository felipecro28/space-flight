export const renderDateFormat: (date: string) => string = (date: string) => {
    const dateFormat = new Date(date);
    return `${dateFormat.getDay()}/${dateFormat.getMonth()}/${dateFormat.getFullYear()}`;
  };