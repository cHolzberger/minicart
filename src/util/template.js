'use strict';

var Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('addOne', function (items) {
    return items + 1;
});

module.exports = function template(hbsTemplate, data) {
    var items = data.cart.items();
    var settings = data.cart.settings();
    var hasItems = data.hasItems = !!items.length;

    data.priceFormat = { format: true, currency: data.cart.settings('currency_code') };
    data.totalFormat = { format: true, showCode: true };


    if (!hasItems) {
        data.form_css_class = 'minicart-empty';
    }
    return hbsTemplate(data);
};


// Workaround for IE 8's lack of support
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}
