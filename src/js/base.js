$(function () {
        // Nav tabs (Bootstrap)
        $('#myTab a').on('click', function (e) {
            e.preventDefault();
            $(this).tab('show');
        })
    
        $('#myTab li:first-child a').tab('show') // Select first tab
});
