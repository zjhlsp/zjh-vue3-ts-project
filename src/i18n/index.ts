import { createI18n } from 'vue-i18n'
// 引入自定义语言对象
import en from './en/en'
import cn from './ZH-CN/cn'

const message = {
    en: {
        ...en
    },
    chs: {
        ...cn
    }
}
const i18n = createI18n({
    legacy: false, // vue3中需要为false
    locale: localStorage.getItem('Lang') || 'chs', // 当前语言
    globalInjection: true, // 全局可通过$t来控制字符串切换中英文
    messages: message
})

export default i18n