const generateUniqueTimeString = (length) => {
    const timestamp = Date.now().toString(36);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    while (result.length < length) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return timestamp + result.slice(0, length - timestamp.length);
}

export default generateUniqueTimeString;