import React from 'react';

const author = 'author';
const noKey = 'noKey';

const groupBooksByKeyWithSort = (arr, key) => {
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
          currentArr[author] = [...(currentArr[author] || []), item];
        }
      } else if (item[key]) {
        const currentKey = item[key];
        //delete item[key];
        currentArr[currentKey] = [...(currentArr[currentKey] || []), item];
      } else {
        currentArr[noKey] = [...(currentArr[noKey] || []), item];
      }

      return currentArr;
    }, {});
};

const getSortedBookCatalogKeys = (books, isNumberKeys = false) => {
  const bookCatalogKeys = Object.keys(books);
  console.log(bookCatalogKeys);
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

const selectRecommendedBookFromCatalog = (books) => {
  const bookYearRestriction = new Date().getFullYear() - 3;

  const filteredBooks = books.filter(
    (item) => item.publicationYear > bookYearRestriction
  );

  const highestBookRating = filteredBooks.reduce((a, b) =>
    a.rating > b.rating ? a : b
  ).rating;

  const recommendedBooks = filteredBooks.filter(
    (item) => item.rating == highestBookRating
  );

  return recommendedBooks[Math.floor(Math.random() * recommendedBooks.length)];
};

const BookCatalog = () => {
  return <div>Book Catalog</div>;
};

export default BookCatalog;
