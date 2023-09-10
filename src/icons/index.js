import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 编译svg到module
const req = require.context('./svg', false, /\.svg$/)
const zwfwIcon = require.context('./svg/zwfw', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
requireAll(zwfwIcon)

