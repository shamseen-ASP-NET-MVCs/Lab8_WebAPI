//this is the controller?
var ViewModel = function () {
    var self = this;
    /***************** retrieving existing books **********************/

    //properties i'm making on the fly (like ViewBag)
    //ko is knockout ==> ko.observable() enables data-binding
    self.error = ko.observable(); //intending to be string
    self.authors = ko.observableArray(); //array w data-bind
    self.books = ko.observableArray(); 
    self.detail = ko.observable() //details of a book; intending to be obj with each detail as a property

    //this exact value will be used for gettign all books or authors in Index
    //a specific book's/author's ID will be appended onto it for anything else.
    var booksUri = '/api/books/';
    var authorsUri = '/api/authors/';
    
    /*called by other functions that want to send request to server
    takes in URL, what method we want (POST, GET, etc), and a holder for data will send AJAX request with 
        book URL, method type, and the container for the data. 
    if GET, then call won't pass in anything for data and it will be the container for what we're retrieving
    if POST, then call will pass in object to hold data we want to post.
    */
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json', //data that is sent/fetched from server is JSON, not XML
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    /* called in this file, but used when Index view loads.
    will send AJAX request through API to get info for all books.
    once API brings back data, will assign to books array. */
    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(
            function (data) {
                self.books(data);
                //Index view then loops through array to show all data in table
            }
        );
    }

    /* called in Details anchor links in Index view of all books
    send AJAX request to API to get details for specific book
    then will assign it to the detail property */    
    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + item.ID, 'GET').done(function (data) {
            self.detail(data);
            //then a box will pop up in Index view with table to show all details
        });
    }

    //Fetch initial data
    getAllBooks();

    /****************** adding new books *****************************/
    //making object to hold user's book addition ==> linked to HTML form elements.
    self.newBook = {
           Author: ko.observable(),
           Title: ko.observable(),
           Price: ko.observable(),
           Year: ko.observable(),
           Genre: ko.observable()
    }

    //will be called by the submit button of the Create form.
    self.addBook = function (formInput) {

        //making a new variable so we can pass form input into ajaxHelper
        var book = {
            AuthorID: self.newBook.Author().Id,
            Title: self.newBook.Title(),
            Price: self.newBook.Price(),
            Year: self.newBook.Year(),
            Genre: self.newBook.Genre()
        };

        //passing in 'POST' because we want to post new object to db
        //passing in book that holds object we want to post
        ajaxHelper(booksUri, 'POST', book).done(function (item) {
            self.books.push(item);
        });
    }

    //used to populate dropdown list for user to select when adding a book.
    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(
            function (data) {
                self.authors(data);
        });
    }

    getAuthors(); //fetching all authors for form's author drop down list
}

ko.applyBindings(new ViewModel());