'use strict';


var constants = require('./constants'),
    events = require('./util/events'),
    viewevents;


module.exports = viewevents = {

    click: function (evt) {
        var target = evt.target,
            minicartRole = target.getAttribute(constants.ITEM_ROLE);
        if (this.isShowing) {
            // Cart close button
            if (minicartRole === constants.CLOSER_CLASS) {
                this.hide();
                // Change state button
            } else if (minicartRole === constants.CHANGE_STATE_CLASS) {
            // Product remove button
                this.changeState(target.getAttribute(constants.TARGET_STATE));
            } else if (minicartRole === constants.REMOVE_CLASS) {
                this.model.cart.remove(target.getAttribute(constants.DATA_IDX));
            // Product quantity input
            } else if (minicartRole === constants.QUANTITY_CLASS) {
                target[target.setSelectionRange ? 'setSelectionRange' : 'select'](0, 999);
            } else if (minicartRole === constants.INPUT_PERSIST) {
                    //fixme see keyup - dupl code

                    if ( target.getAttribute("type") ==="checkbox") {
                        this.model.cart.form[target.getAttribute('name')] =  target.checked? target.value:"";
                    } else {
                        this.model.cart.form[target.getAttribute('name')] = target.value;
                    }
            // Outside the cart
            } else if (!(/input|button|select|option/i.test(target.tagName))) {
                while (target.nodeType === 1) {
                    if (target === this.el) {
                        return;
                    }

                    target = target.parentNode;
                }

                this.hide();
            }
        }
    },


    keyup: function (evt) {
        var that = this,
            target = evt.target,
            timer;
        var minicartRole = target.getAttribute(constants.ITEM_ROLE);
        if (minicartRole === constants.QUANTITY_CLASS) {
            timer = setTimeout(function () {
                var idx = parseInt(target.getAttribute(constants.DATA_IDX), 10),
                    cart = that.model.cart,
                    product = cart.items(idx),
                    quantity = parseInt(target.value, 10);

                if (product) {
                    if (quantity > 0) {
                        product.set('quantity', quantity);
                    } else if (quantity === 0) {
                        cart.remove(idx);
                    }
                }
            }, constants.KEYUP_TIMEOUT);
        } else if (minicartRole === constants.INPUT_PERSIST) {
            if ( target.getAttribute("type") ==="checkbox") {
                this.model.cart.form[target.getAttribute('name')] =  target.checked? target.value:"";
            } else {
                this.model.cart.form[target.getAttribute('name')] = target.value;
            }
        }
    },


    readystatechange: function () {
        if (/interactive|complete/.test(document.readyState)) {
            var forms, form, i, len;

            // Bind to page's forms
            forms = document.getElementsByTagName('form');

            for (i = 0, len = forms.length; i < len; i++) {
                form = forms[i];

                if (form.cmd && constants.COMMANDS[form.cmd.value]) {
                    this.bind(form);
                }
            }

            // Do the initial render when the buttons are ready
            this.redraw();

            // Only run this once
            events.remove(document, 'readystatechange', viewevents.readystatechange);
        }
    },


    pageshow: function (evt) {
        if (evt.persisted) {
            this.redraw();
            this.hide();
        }
    }

};
