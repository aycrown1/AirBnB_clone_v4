$(document).ready(function() {
    var selectedAmenities = {};
    var selectedStatesCities = [];
    $('input[type="checkbox"]').change(function() {
        if ($(this).parent().hasClass('locations')) {
            var locationId = $(this).data("id");
            var locationName = $(this).data("name");
            if ($(this).is(':checked')) {
                selectedStatesCities.push(locationId);
            } else {
                selectedStatesCities = selectedStatesCities.filter(item => item !== locationId);
            }
            var selectedLocationList = selectedStatesCities.join(", ");
            $('.locations h4').text(selectedLocationList);
        } else if ($(this).parent().hasClass('amenities')) {
            var amenityId = $(this).data("id");
            var amenityName = $(this).data("name");
            if ($(this).is(':checked')) {
                selectedAmenities[amenityId] = amenityName;
            } else {
                delete selectedAmenities[amenityId];
            }
            var selectedAmenityList = Object.values(selectedAmenities).join(", ");
            $('.amenities h4').text(selectedAmenityList);
	}
    });

    
$(':button').on('click', function () {
    let amenities = {'amenities': clicked};
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(amenities),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        $('.places article').remove();
        for (let place of data) {
          $('.places').append('<article><div class="title_box"><h2>' + place['name'] + '</h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest">' + place['max_guest'] +  'Guest</div><div class="number_rooms">' + place['number_rooms'] +  'Bedroom</div><div class="number_bathrooms">' + place['number_bathrooms'] +  'Bathroom</div></div><div class="user"><b></div><div class="description">'
			      + place['description'] + '</div></article>')
	}
      }
    });
});

$.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus) {
    if (data.status === "OK") {
        $("#api_status").addClass("available");
    } else {
        $("#api_status").removeClass("available");
    }
});

$.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      for (let place of data) {
        $('.places').append('<article><div class="title_box"><h2>' + place['name'] + '</h2><div class="price_by_night">' + place['price_by_night'] + '</div></div><div class="information"><div class="max_guest">' + place['max_guest'] +  'Guest</div><div class="number_rooms">' + place['number_rooms'] +  'Bedroom</div><div class="number_bathrooms">' + place['number_bathrooms'] +  'Bathroom</div></div><div class="user"><b></div><div class="description">'
			    + place['description'] + '</div></article>');
      }
    }
});
