const button = document.querySelector('#btn');
const output = document.querySelector('.output');
const form = document.querySelector('#myForm');

const displayBookmarks = (e) => {
    // Prevent default load
    e.preventDefault();
    // Getting the value of input
    const name = document.querySelector('#name');
    const url = document.querySelector('#url');
    // URL validator regex
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    // Validating the input form and processing the data
    if(name.value === '' && url.value === ''){
        alert('Please enter website name and URL!');

    } else if(url.value === '') {
        alert('Please enter website URL!');

    } else if(name.value === '') {
        alert('Please enter website name!');

    } else if(!url.value.match(regex)) {
        alert('Please enter a valid URL!');

    } else {
        // Initial object for each bookmark
        const bookmark = {
            name: name.value,
            url: url.value
        };

        if(localStorage.getItem('bookmarks') === null) {
            // Create blank array to fill with bookmark object data
            const bookmarks = [];
            // Fill the empty array with data from bookmark object
            bookmarks.push(bookmark);
            // Set the bookmark array to localStorage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
        } else {
            // Get the data from local storage and put in a variable
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
            // Add new data from the bookmark object to the existing localstorage data
            bookmarks.push(bookmark);
            // Update the data in localstorage
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        };
        // Loop over the data in localstorage and put on DOM
        fetchBookmark();
        // Reset the form
        form.reset();
        // Move focus to site name
        name.focus();
    }
};

// Display bookmark on DOM
const fetchBookmark = () => {
    // Get the data from local storage and put in a variable
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks and create html for each one
    const html = bookmarks.map(bookmark => {
        return `
        <div id="item">
        <p id="itemName">${bookmark.name}</p>
        <a id="link" target="_blank" href="${bookmark.url}">Visit</a>
        <button id="dlt">X</button>
       </div>
        `
    }).join('');
    // Put the html on DOM
    output.innerHTML = html;

};

// Delete bookmark
const deleteBookmark = (e) => {
    // Get the data from local storage and put in a variable
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get the textcontent of the site name element
    const name = e.target.previousElementSibling.previousElementSibling.textContent;
    // Loop through the bookmark and find and delete the one when target textcontent and bookmark name are same
    bookmarks.forEach((bookmark, index) => {
        if(bookmark.name === name) {
            e.target.parentElement.remove();
            bookmarks.splice(index, 1)
        }
    });
    // Update the data in localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

document.addEventListener('click', deleteBookmark)
button.addEventListener('click', displayBookmarks);