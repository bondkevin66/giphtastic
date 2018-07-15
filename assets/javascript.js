var villains = [
  "catwoman", "deadshot", "deathstroke", "the joker", "killer croc", "poison ivy",
  "bane", "mister freeze", "red hood"
];

$(document).ready(function() {
    for (var i = 0; i < villains.length; i++) {
        $("#villain-buttons").append("<button type='button' onclick='searchGif(\"" + villains[i] + "\")' class='btn btn-primary' value=' " + villains[i] + "'> " + villains[i] + " </button>");
    }
});

$(document).on('click', '.close', function () {
    $(this).parents('div').fadeOut();
});

function villainButtonClicked() {
    var userInput = $('#villain-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#villain-input').val();

    if (userInput) {
        $('#villain-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=Vrcepf9TNquETfjGvUdUwDXPNf7Jt65g',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        });
}

function displayGif(response) {
    $('#villain').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#villain').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}
