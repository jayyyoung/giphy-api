

// starting variables, including the initial names that can be clicked to show gifs
var characterName = ['Game of Thrones', 'White Walker', 'Jon Snow', 'Danaerys', 'The Mountain', 'The Hound', 'Melisandre'];
var currentGif; 
var pausedGif; 
var animatedGif; 
var sittingGif;

//function that creates buttons while brings up all the GIFS info and the gif itself
function createButtons(){
	$('#characterButtons').empty();
	for(var i = 0; i < characterName.length; i++){
		var showButton = $('<button type="button" class="btn btn-primary">').text(characterName[i]).addClass('showButton').attr({'data-name': characterName[i]});
		$('#characterButtons').append(showButton);
	}

	//displays gifs on click
	$('.showButton').on('click', function(){
		// this allows the searched name to be seached in the GIPHY API url
		$('.display').empty();
		var nameSearch = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + nameSearch + "&limit=10&api_key=524a113ea2eb4aaa846dc412bba0fdea";
		
		$.ajax({
			url: queryURL, 
			method: 'GET'
		}).done(function(event){
			currentGif = event.data;
			
			$.each(currentGif, function(index,value){
				animatedGif = value.images.original.url;
				pausedGif = value.images.original_still.url;
				
				// Gives the gif its rating
				var thisRating = value.rating;
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				
				//Animates GIF on click
				sittingGif = $('<img>').attr('data-animated', animatedGif).attr('data-still', pausedGif).attr('src', pausedGif).addClass('.clickPlay');

				// shows entire gif plus its raiting
				var fullGifDisplay = $('<div class="panel panel-default">').append(rating, sittingGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on click
$(document).on('click', '.clickPlay', function(){
	var state = $(this).attr('data-state');

 	if (state === "still") {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state","still");
        }
});

//creates the new button
$('#addCharacter').on('click', function(){
	var newCharacter = $('#searchedCharacter').val().trim();
	characterName.push(newCharacter);
	createButtons();
	return false;
});

createButtons();