$(function () {
        // Nav tabs (Bootstrap)
        $('#myTab a').on('click', function (e) {
            e.preventDefault();
            $(this).tab('show');
        })
    
        $('#myTab li:first-child a').tab('show') // Select first tab
});

// Sticky Menu
function stickyMenu() {
    let headerH = $('.top-header').height();
    let breadcrumbH = $('.breadcrumb-wrap').height();
    let bannerH = $('.media-wrap').height();
    let offsetH = headerH + breadcrumbH + bannerH;

    let stickyNavH = $('.sticky-nav').height();

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > offsetH) {
            $('.sticky-nav').addClass('is-sticked');

        } else {
            $('.sticky-nav').removeClass('is-sticked');
        }
    });
}

stickyMenu(); 