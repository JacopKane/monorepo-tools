(function ($){

    Shopsys = Shopsys || {};
    Shopsys.categoryTree = Shopsys.categoryTree || {};
    Shopsys.categoryTree.FormItem = Shopsys.categoryTree.FormItem || {};

    Shopsys.categoryTree.FormItem = function ($item, parent) {
        var self = this;
        self.STATUS_OPENED = 'opened';
        self.STATUS_CLOSED = 'closed';
        self.STATUS_NONE = 'none';

        var status = null;
        var $statusIcon = $item.find('.js-category-tree-form-item-icon:first');
        var $checkbox = $item.find('.js-category-tree-form-item-checkbox:first');
        self.parent = parent;
        self.children = [];

        var $childrenContainer = $item.find('.js-category-tree-form-children-container:first');

        this.init = function () {
            initChildren();
            initStatus();

            $statusIcon.click(self.statusToggle);
        };

        var initChildren = function () {
            $childrenContainer.find('> .js-category-tree-form-item').each(function () {
                var childItem = new Shopsys.categoryTree.FormItem($(this), self);
                childItem.init();
                self.children.push(childItem);
            });
        };

        var initStatus = function () {
            // status could be set to "opened" by children
            if (status === null) {
                if ($item.data('has-children')) {
                    self.close(false);
                } else {
                    setStatus(self.STATUS_NONE);
                }

                if ($checkbox.is(':checked')) {
                    if (self.parent instanceof Shopsys.categoryTree.FormItem) {
                        self.parent.open(false);
                    }
                }
            }
        };

        this.statusToggle = function () {
            if (status === self.STATUS_CLOSED) {
                self.open(true);
            } else if (status === self.STATUS_OPENED) {
                self.close(true);
            }
        };

        this.open = function (animate) {
            if (!$childrenContainer.is(':animated')) {
                $childrenContainer.slideDown(animate === true ? 'normal' : 0);
                setStatus(self.STATUS_OPENED);
                if (self.parent instanceof Shopsys.categoryTree.FormItem) {
                    self.parent.open(animate);
                }
            }
        };

        this.close = function (animate) {
            if (!$childrenContainer.is(':animated')) {
                $childrenContainer.slideUp(animate === true ? 'normal' : 0);
                setStatus(self.STATUS_CLOSED);
            }
        };

        var setStatus = function (newStatus) {
            status = newStatus;
            updateStatusIcon();
        };

        var updateStatusIcon = function () {
            $statusIcon.removeClass('svg svg-circle-plus svg-circle-remove sprite sprite-level cursor-pointer form-tree__item__icon--level');
            switch (status) {
                case self.STATUS_OPENED:
                    $statusIcon.addClass('svg svg-circle-remove cursor-pointer');
                    break;
                case self.STATUS_CLOSED:
                    $statusIcon.addClass('svg svg-circle-plus cursor-pointer');
                    break;
                case self.STATUS_NONE:
                    $statusIcon.addClass('sprite sprite-level form-tree__item__icon--level');
                    break;
            }
        };

    };

})(jQuery);
