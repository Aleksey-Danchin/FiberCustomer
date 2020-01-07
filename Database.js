;(function () {
    'use strict'

    const KEY = '__FIBER_CUSTOMER_DATABASE__'

    const api = {}

    api.save = function save (state) {
        localStorage.setItem(KEY, JSON.stringify(state))
    }

    api.load = function load () {
        return JSON.parse(localStorage.getItem(KEY))
    }

    window.Database = api

})();