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

