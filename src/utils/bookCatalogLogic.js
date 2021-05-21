export const author = 'author';
export const publicationYear = 'publicationYear';
export const rating = 'rating';
export const noKey = 'noKey';
export const noKeyHeader = 'Not specified';

export const groupBooksByKeyWithSort = (arr, key) => {
  const newArr = [...arr];

  return newArr
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else {
        return -1;
      }
    })
    .reduce((currentArr, item) => {
      if (key === author) {
        for (const author of item[key]) {
          if (author.length)
            currentArr[author] = [...(currentArr[author] || []), item];
        }
      } else if (item[key] || item[key] === 0) {
        const currentKey = item[key];
        currentArr[currentKey] = [...(currentArr[currentKey] || []), item];
      } else {
        currentArr[noKey] = [...(currentArr[noKey] || []), item];
      }

      return currentArr;
    }, {});
};

export const getSortedBookCatalogKeys = (books, isNumberKeys = false) => {
  const bookCatalogKeys = Object.keys(books);
  let hasNoKeys = false;

  if (noKey in bookCatalogKeys) {
    hasNoKeys = true;
    bookCatalogKeys.splice(bookCatalogKeys.indexOf([noKey]), 1);
  }

  if (isNumberKeys) {
    bookCatalogKeys.sort((a, b) => Number(b) - Number(a));
  } else {
    bookCatalogKeys.sort((a, b) => {
      if (a > b) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  return hasNoKeys ? bookCatalogKeys.push(noKey) : bookCatalogKeys;
};

export const selectRecommendedBookFromCatalog = (books) => {
  const bookYearRestriction = new Date().getFullYear() - 3;

  const filteredBooks = books.filter(
    (item) => item.publicationYear > bookYearRestriction
  );

  if (filteredBooks.length === 0) return null;

  const highestBookRating = filteredBooks.reduce((a, b) =>
    a.rating > b.rating ? a : b
  ).rating;

  const recommendedBooks = filteredBooks.filter(
    (item) => item.rating == highestBookRating
  );

  return recommendedBooks[Math.floor(Math.random() * recommendedBooks.length)];
};
