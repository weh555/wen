const Mock = require('mockjs')

const data1 = {
  code: 200,
  message: 'yes',
  success: true,
}

module.exports = [
  {
    url: '/vue-admin-template/testdata',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: item1
      }
    }
  }
]
