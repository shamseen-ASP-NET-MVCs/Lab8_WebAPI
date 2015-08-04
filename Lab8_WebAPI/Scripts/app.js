//this is the controller?
var ViewModel = function () {
    var self = this;

    //properties i'm making on the fly (like ViewBag)
    self.books = ko.observableArray(); //ko is Knockout
    self.error = ko.observable(); //enables data-binding
        //observableArray is array fersio

    var booksUri = '/api/books';
    
    function ajaxHelper(uri, method, data) {
        self.error(''); //clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(
            function (jqXHR, textStatus, errorThrown) {
                self.error(errorThrown);
            }
        );
    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(
            function (data) {
                self.books(data);
            }
        );
    }

    //Fetch initial data
    getAllBooks();
}

ko.applyBindings(new ViewModel());