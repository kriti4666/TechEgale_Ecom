export function truncateParagraph(text, maxWords = 20) {
    const words = text.split(' ');
  
    if (words.length > maxWords) {
      const truncatedText = words.slice(0, maxWords).join(' ');
      return `${truncatedText} ...`;
    }
  
    return text;
  }



export function removeHashFromURL(url) {
    const hashIndex = url.indexOf('#');
    
    if (hashIndex !== -1) {
      return url.substring(0, hashIndex);
    }
    return url;
  }


  export function formatDateString(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  }