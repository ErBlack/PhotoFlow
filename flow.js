$(window).load(function() {
    $('.wflow').wflow();
});

$.widget('proto.wflow', {
    options: {
        duration: 0.05,
        gallery: '.gallery'
    },
    _create: function() {
    	this._chain().each(function() {
    		$(this).width($('img', this).width());
    	});
    	
    	this.gallery = $(this.options.gallery);
    	
    	this.element.hover($.proxy(this, '_break'), $.proxy(this, '_iterate', false)).delegate('img', 'click', $.proxy(this, '_show'));
    	
    	this.current = this._chain().first();
        this._iterate();
    },
    _show: function(e) {
    	if (!this.gallery.is('.preview')) {
    		this._iterate(false);
    		var target = $(e.target), ar = target.width() / target.height(), _ar = this.gallery.width() / this.gallery.height();
    		this.preview = target.clone().toggleClass('landscape', ar <= _ar).toggleClass('portrait', ar > _ar).appendTo(this.gallery.addClass('preview')).bind('click', $.proxy(this, '_hide'));
    	}
    },
    _hide: function() {
    	this.preview.remove();
    	this.gallery.removeClass('preview');
    },
    _break: function() {
    	if (this.current && !this.gallery.is('.preview')) this.current.stop(true, false);
    },
    _iterate: function(reset) {
    	if (reset) {
    		this.current.stop(true, false).css('marginLeft', '').appendTo(this.element);
    		this.current = this._chain().first();
    	}
        
        this.current.animate({
            marginLeft: -this.current.outerWidth()
        }, (this.current.outerWidth() + parseInt(this.current.css('marginLeft'), 10)) / this.options.duration, 'linear', $.proxy(this, '_iterate', true));
    },
    /**
     * @return {jQuery}
     */
    _chain: function() {
        return $('li', this.element);
    }
});