jQuery(document).ready(function($) {
    function openTopicModal(url) {
        var modal = $('#cmp-modal');
        var iframe = $('#cmp-modal-iframe');
        var loadingIndicator = $('#cmp-modal-loading');

        modal.fadeIn();
        loadingIndicator.show();

        iframe.attr('src', url).on('load', function() {
            loadingIndicator.hide();
            var iframeDoc = iframe[0].contentDocument || iframe[0].contentWindow.document;
            // Hide header and title in iframe
            $(iframeDoc).find('#masthead').hide();
            $(iframeDoc).find('.entry-title').hide();
        }).on('error', function() {
            loadingIndicator.hide();
            iframe.contents().find('body').html('<p>Failed to load content.</p>');
        });
    }

    $(document).on('click', 'a[href*="edit-topic&ld-topic="]', function(e) {
        e.preventDefault();
        openTopicModal($(this).attr('href'));
    });

    $(document).on('click', '.cmp-close', function() {
        $('#cmp-modal').fadeOut();
        $('#cmp-modal-iframe').attr('src', '');
    });

    $(window).on('click', function(e) {
        if ($(e.target).is('#cmp-modal')) {
            $('#cmp-modal').fadeOut();
            $('#cmp-modal-iframe').attr('src', '');
        }
    });

    $(window).on('resize', function() {
        var iframe = $('#cmp-modal-iframe');
        iframe.height($(window).height() * 0.8);
    }).trigger('resize');

    $('#cmp-modal .cmp-modal-content').resizable({
        minHeight: 300,
        minWidth: 300,
        alsoResize: '#cmp-modal-iframe'
    });
});