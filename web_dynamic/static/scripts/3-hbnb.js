$(document).ready(function() {
    var selected = {};
    $('input[type="checkbox"]').change(function() {
        var amenityId = $(this).parent().data("id");
        var amenityName = $(this).parent().data("name");
        if ($(this).is(':checked')) {
            selected[amenityId] = amenityName;
        } else {
            delete selected[amenityId];
        }

        var selectedList = Object.values(selected).join(", ");
        $('.amenities h4').text(selectedList);
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
