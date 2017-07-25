//Topic Array to search on GIPHY
var topics = ["SUSHI","BURGERS","FRIES","COOKIES","ICE CREAM","SALAD","FRUITS","PASTA","CUPCAKE","STEAK","PANCAKE", "FISH"];


function displayButton(){
	var food = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=7b8691fa95a8456cbf0856adc826448d&limit=10&rating=";
	
	$("#food-view").empty();

	$.ajax({
	url: queryURL,
	method:"GET"
		}).done(function(response){
		console.log(response);
		for (var i = 0; i <response.data.length; i++){
		var giphy = $("<div class='foodInfo'>");
		
		//Store the rating data
		var rating = response.data[i].rating;
		
		//Creating an element to display the rating reponse
		var ratingDisplay = $("<p>").text("Rating: " + rating);

		//Display Rating
		giphy.append(ratingDisplay);

		//Store Moving Giphy Image
		var giphyImageURL = response.data[i].images.original.url;

		//Store Still Giphy Image
		var stillImageURL = response.data[i].images.original_still.url;
		
		//Creating an element to display the Giphy Image
		var image = $("<img>");
		image.attr("src", stillImageURL);
		image.attr("data-still", stillImageURL);
		image.attr("data-animate", giphyImageURL);
		image.attr("data-state", "still");
		image.addClass("giphyImage");

		//Display Rating
		giphy.append(image);

		$("#food-view").append(giphy);
		}

	});
};





//Create Button
function createButton(){
	$("#buttons-view").empty();
	//Looping through to create buttons dynamically for each item in the array
	for(var i = 0; i< topics.length; i++){
		var button = $("<button>");
		button.addClass("button");
		button.attr("data-name", topics[i]);
		button.text(topics[i]);
		$("#buttons-view").append(button);
		console.log(button);
	}	
}
//This function handles adding new food inputs
$("#add-food").on("click", function(event){
	event.preventDefault(); 
	//This will take the store input and add them to the array
	var food = $("#food-input").val().trim();
	topics.push(food);
	$("#food-input").val("");
	//Calling create button to go through our topic array
	createButton();
});

	function animationToggle(){
	var state = $(this).attr("data-state");
	if (state === "still") {
        var animated = $(this).attr("data-animate")
        $(this).attr("src", animated);
        $(this).attr("data-state", "animate");
      } 
    else {
    	var still = $(this).attr("data-still")
        $(this).attr("src", still);
        $(this).attr("data-state", "still");
      }
		
	}





 // Adding a click event listener to all elements with a class of "button"
    $(document).on("click", ".button", displayButton);

	createButton();

	$(document).on("click", ".giphyImage", animationToggle);




