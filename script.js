$(document).ready(function() {
  numItems = $('.row').length + placenames.length;

  $.serial(placenames, function(placename){
    return $.when(getLatLong(placename).done(function(cords){
         //Insert the coordinates into the HTML.
        if (cords){ 
          falseCoords.push(cords);
        }
            
      //If there weren't results for the address, do nothing.
      if(!cords) return;
            
        }), $.wait(1500))
        .always(function(){
          updateProgress();
       });
  }).done( geocodeRows );
  
// When the retrieval of the cords fails...
//   .fail(function(error){
// console.log( " Error: " + error);
//   });
});
function checkFalseCoors(cords){
	//Clear out Google Maps inacurate coordinates.
  for(index = 0; index < falseCoords.length; index++){
    if(falseCoords[index].lat == cords.lat &&  falseCoords[index].lon == cords.lon)
      return false;

  }
  return true;

}

function geocodeRows(){

        var locations = $('.row').map(function(){
          return $(this).children('.adres').text() + ", " + $(this).children('.adres').attr("name");

        });

        $.serial(locations, function(location){
                return $.when(getLatLong(location).done(function(cords){
                 //Insert the coordinates into the HTML.
                if (cords && checkFalseCoors(cords)){
                  $('.row').eq(finishedRows).children('.lat').text(cords.lat);
                  $('.row').eq(finishedRows).children('.lon').text(cords.lon);  
                }   
                    //If there weren't results for the address, do nothing.
              if(!cords) return;
                    
                }), $.wait(4000))
                .always(function(){
                finishedRows++;
            updateProgress();});
        });
        
      //When the retrieval of the cords fails...
    //   .fail(function(error){
      // console.log( " Error: " + error);
    //   });
    
}
function updateProgress(){
    finished++;
    var percentage = finished* 100/numItems;
    if (percentage == 100){
        $('#progressbar').hide();
    }
    else{
        $( "#progressbar" ).progressbar({ value: Math.round(percentage) });
    }

}
function getLatLong(address) {
    
    //Create the Deferred object that handles the callbacks.

    var D = $.Deferred();
    var P = D.promise();
    
    //Create the geocoder instance.
    var geocoder = new google.maps.Geocoder();
    
    //Send the geocode request for the given address.
    //Region: NL means it assumes the address is in the Netherlands, change as needed
    geocoder.geocode( { 'address': address, 'region': region }, function(results, status) {
        
        //The deferred fails if this request failed.
        if(status !== google.maps.GeocoderStatus.OK){
           switch(status){
               case google.maps.GeocoderStatus.ZERO_RESULTS: return D.resolve(null) && false;
               default: return D.reject(status) && false;
            }
        }
        
        //Create the latlon object.
        var latlon = {
            lat: results[0].geometry.location.lat(),
            lon: results[0].geometry.location.lng()
        };
        
        
      //trim off overabundance of insignificant numbers.   
    latlon.lon = latlon.lon.toString().substr(0,9);
    latlon.lat = latlon.lat.toString().substr(0,10);
    
        //Resolve the deferred with it.
        D.resolve(latlon);
        
    });
    
   
   //Return the promise object.
    return P;
}
