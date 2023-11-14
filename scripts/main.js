const book = {
  name: "The Da Vinci Code",
  'cover': "https://m.media-amazon.com/images/I/81jtrIKJd2L._AC_UF1000,1000_QL80_.jpg",
  author: "Dan Brown",
  rating: 4,
  'page-count': 534,
  language: "English",
  genre: "Mystery",
  date: "March 31, 2009",
  description: "#1 WORLDWIDE BESTSELLER • While in Paris, Harvard symbologist Robert Langdon is awakened by a phone call in the dead of the night. The elderly curator of the Louvre has been murdered inside the museum, his body covered in baffling symbols.\n" +
    "\n" +
    "        “Blockbuster perfection.... A gleefully erudite suspense novel.” —The New York Times\n" +
    "\n" +
    "        “A pulse-quickening, brain-teasing adventure.” —People\n" +
    "\n" +
    "        As Langdon and gifted French cryptologist Sophie Neveu sort through the bizarre riddles, they are stunned to discover a trail of clues hidden in the works of Leonardo da Vinci—clues visible for all to see and yet ingeniously disguised by the painter.\n" +
    "\n" +
    "        Even more startling, the late curator was involved in the Priory of Sion—a secret society whose members included Sir Isaac Newton, Victor Hugo, and Da Vinci—and he guarded a breathtaking historical secret. Unless Langdon and Neveu can decipher the labyrinthine puzzle—while avoiding the faceless adversary who shadows their every move—the explosive, ancient truth will be lost forever."
}

validateBook(book)
addBookDataOnPage(book)
addFunctionToMoreButton()
addCommentsFromLocaleStorage()


function addBookDataOnPage(book) {
  for (const key in book) {
    const element = document.querySelector(`.book__${key}`);

    if (!element) {
      continue;
    }

    if (key === 'cover') {
      element.src = book[key];
      element.alt = book.name;

      continue;
    }

    if (key === 'rating') {
      element.classList.add(`stars--${book[key]}`);

      continue;
    }

    element.innerHTML = book[key];
  }
}

function validateBook(book) {
  const requiredKeys = ['name', 'cover', 'author', 'rating', 'page-count',
    'language', 'genre', 'date', 'description'];
  const bookKeys = Object.keys(book);

  requiredKeys.forEach(requiredKey => {
    if (!bookKeys.includes(requiredKey)) {
      throw new Error(`book should have property "${requiredKey}"`);
    }
  })

  const requiredRating = Array.from({ length: 5 }, (_, ind) => ind + 1);
  if (!requiredRating.includes(Number(book.rating))) {
    throw new Error(`book.rating is "${book.rating}" but should be 1 || 2 || 3 || 4 || 5`);
  }

  const requiredStringKeys = requiredKeys
    .filter(key => key !== 'rating' && key !== 'page-count' && key !== 'name');
  requiredStringKeys.forEach(stringKey => {
    if (typeof book[stringKey] !== 'string') {
      throw new Error(`book.${stringKey} is "${book[stringKey]}" but its should be string`);
    }
  })
}

function addFunctionToMoreButton() {
  const descriptionText = document.querySelector('.book__description');
  const moreButton = document.querySelector('.book__more');

  if (descriptionText.innerHTML.length > 400) {
    moreButton.style.display = 'inline-block';
  }

  moreButton.onclick = function () {
    if(descriptionText.classList.contains("book__description--open")){
      //show less text
      descriptionText.classList.remove("book__description--open");
      moreButton.innerHTML = "SHOW MORE";
    } else {
      //show more text
      descriptionText.classList.add("book__description--open");
      moreButton.innerHTML = "SHOW LESS";
    }
  };
}

function addComment() {
  const authorNameInput = document.querySelector(".comments__new-author");
  const commentTextArea = document.querySelector(".comments__new-comment");
  const authorName = authorNameInput.value;
  const comment = commentTextArea.value;

  if (!authorName || !comment) {
    alert("Please fill in all fields before adding a comment.");
    return;
  }

  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push({ authorName, comment});
  localStorage.setItem('comments', JSON.stringify(comments));
  addOneCommentOnPage(authorName, comment);

  authorNameInput.value = "";
  commentTextArea.value = "";
}

function addOneCommentOnPage(authorName, comment) {

  const newComment = document.querySelector('.comments__comment')
    .cloneNode(true);
  const commentsContainer = document.querySelector('.comments');

  const authorNameElement = newComment.querySelector('.comments__name');
  const commentTextElement = newComment.querySelector('.comments__comment-text');

  authorNameElement.textContent = authorName;
  commentTextElement.textContent = comment;


  commentsContainer.appendChild(newComment);
}

function addCommentsFromLocaleStorage() {
  const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
  const templateComment = document.querySelector('.comments__comment');
  const commentsContainer = document.querySelector('.comments');

  storedComments.forEach(comment => {
    const newComment = templateComment.cloneNode(true);
    const authorNameElement = newComment.querySelector('.comments__name');
    const commentTextElement = newComment.querySelector('.comments__comment-text');
    authorNameElement.textContent = comment.authorName;
    commentTextElement.textContent = comment.comment;

    commentsContainer.appendChild(newComment);
  });
}

