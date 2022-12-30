import modulesGenerator from './templates/page/prompt.js'
import apiGenerator from './templates/api/prompt.js'

export default function (plop) {
  plop.setHelper('equal', function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this)
    }
    return options.inverse(this)
  })
  plop.setWelcomeMessage('请选择需要创建的模式：')
  plop.setGenerator('modules', modulesGenerator)
  plop.setGenerator('api', apiGenerator)
}
