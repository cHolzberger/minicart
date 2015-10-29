'use strict';


var mixin = require('./util/mixin');


var defaults = module.exports = {

    name: 'PPMiniCart',

    parent: (typeof document !== 'undefined') ? document.body : null,

    action: 'https://www.paypal.com/cgi-bin/webscr',

    target: '',

    duration: 30,

    template: require('./themes/znaps/index.hbs'),
    template_states: {
        'default': require('./themes/znaps/step1.hbs'),
        'step2': require('./themes/znaps/step2.hbs'),
        'step3': require('./themes/znaps/step3.hbs')
    },

    styles: '$STYLES$',

    shipping_global: 3.99,
    tax: 19,
    strings: {
        button: 'Check Out with <img src="//cdnjs.cloudflare.com/ajax/libs/minicart/3.0.1/paypal_65x18.png" width="65" height="18" alt="PayPal" />',
        subtotal: 'Subtotal:',
        discount: 'Discount:',
        empty: 'Your shopping cart is empty'
    }

};


/**
 * Mixes in the user config with the default config.
 *
 * @param {object} userConfig Configuration overrides
 * @return {object}
 */
module.exports.load = function load(userConfig) {
    return mixin(defaults, userConfig);
};
