'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://m_college.quansuwangluo.com/api/admin/"',
  BASE_API: '"http://192.168.50.252/api/admin/"',
  // BASE_API: '"http://192.168.199.224/api/admin/"',
  // BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
})
