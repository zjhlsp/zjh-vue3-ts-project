
const validateRules = (rule: any, value: string, callback: Function) => {
  const { rules } = rule
  const { label, errTip } = rule
  let tip
  for (const i in  rules) {
      const validator = ruleMap[i]
      tip = validator(value, rules[i], label, errTip)
      if (tip) {
          if (callback) {
              callback(tip)
              return
          } else {
              return tip
          }
      }
  }
  if (callback) {
      callback()
  } else {
      return tip
  }
}
    // if (value === '') {
    //   callback(new Error('Please input the password'))
    // } else {
    //   if (ruleForm.checkPass !== '') {
    //     if (!ruleFormRef.value) return
    //     ruleFormRef.value.validateField('checkPass', () => null)
    //   }
    //   callback()
    // }

  const ruleMap = {
    /**
     * 方法传参统一遵循
     * 【0】： 输入
     * 【1】：校验必需参数
     * 【2】：校验需要的其他参数
     */

    /**
     * 校验字符长度
     * @param {String} value 校验值
     * @param {Array,Number} len 当为数字时表示数字范围 [min,max] -1表示不设限，为数字时表示仅可输入长度
     * @returns 校验信息
     */
    length: (value:string, len:number[] | number) => {
        let msg = ''
        if (value) {
            const val = value.length
            if (Array.isArray(len) && len.length === 2 && Number.isInteger(len[0]) && Number.isInteger(len[1]) && len[0] < len[1] && len[1]) {
                if (len[0] === -1) {
                    val > len[1] && (msg = `输入长度应小于${len[1]}`)
                } else if (len[1] === -1) {
                    val < len[0] && (msg = `输入长度应大于${len[0]}`)
                } else {
                    if (val < len[0] || val > len[1]) {
                        msg = `字符长度范围${len[0]}~${len[1]}位`
                    }
                }
                return msg
            } else if (isNaN(+len)) {
                if (val !== len) {
                    msg = `输入长度应为${len}`
                }
            } else {
                return new Error('非法的数字校验长度')
            }
        } else {
            return msg
        }
    },

    /**
     * 必填
     * @param {String} value 校验值
     * @param {*} content 是否必填
     * @param {*} field 提示名称
     * @returns 校验信息
     */
    required: (value: string, content: boolean, field: string, errTip: string) => {
        let msg
        if (content && !value) {
            msg = errTip || `请输入${field}`
        } else {
            msg = ''
        }
        return msg
    },

    /**
     * 校验小数位
     * @param {String} value 校验值
     * @param {Number} deci 保留小数位数
     * @returns 校验信息
     */
    decimals (value: string, deci: number) {
        const val = value
        let msg
        if (!val) {
            if (String(val).includes('.')) {
                const part = val.split('.')
                if (part.length === 2) {
                    if (part[1] && part[1].length < Number(deci)) {
                        msg = ''
                    } else {
                        msg = `最多保留${deci}位小数`
                    }
                } else {
                    msg = `最多保留${deci}位小数`
                }
                return msg
            } else {
                return msg
            }
        }
    },

    /**
     * 校验整数
     * @param {String} value 校验值
     * @param {number} type 0 1 表示整数
     * @returns 校验信息
     */
    int (value: string, type: boolean | number) {
        type = type ? 1 : 0
        // value = Number(value)
        const map = [
            { reg: /^-[1-9]\d*$/, msg: '请输入负整数' },
            { reg: /^[1-9]\d*$/, msg: '请输入正整数' }
        ]
        const reg = map[type].reg
        let msg = reg.test(value) ? '' : map[type].msg
        if (type && value === '0') {
            msg = ''
        }
        return msg
    },

    /**
     * 专用校验
     * @param {String} value 校验值
     * @param {String} name constan.js 中 REGEXP 所包含的正则校验，返回的 TIP 校验信息 key 应相同
     * @returns 校验信息
     */
    reg (value: string, name: string | number) {
        let msg
        value = value ? String(value).trim() : ''
        if (value !== '') {
            msg = REGEXP[name].test(value) ? '' : ('请输入正确格式')
        }
        return msg
    }
  }

  // 正则集合
const REGEXP = {
  // IP 地址
  IP: /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/,
  // IPV6 格式地址
  IPV6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
  // MAC 地址
  MAC: /^[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}:[A-F0-9]{2}$/,
  // 端口
  PORT: /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])$/,
  // 掩码
  MASK: /^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^255\.(254|252|248|240|224|192|128|0)\.0\.0$|^255\.255\.(254|252|248|240|224|192|128|0)\.0$|^255\.255\.255\.(254|252|248|240|224|192|128|0)$/,
  // 网关
  GATEWAY: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  // 用户名
  USERNAME: /^[a-zA-Z][a-zA-Z0-9]{0,15}$/,
  // 邮箱
  EMAIL: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
  // 密码
  // eslint-disable-next-line no-useless-escape
  PASSWORD: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![`~\!@#\$%\^&\*\(\)\-_\=\+\[\]\{\}\\\|;:\'",./\?\<>]+$)[`~\!@#\$%\^&\*\(\)\-_\=\+\[\]\{\}\\\|;:\'",./\?\<>0-9A-Za-z]{8,16}$/,
  // 手机
  PHONE: /^1(3|4|5|7|8)\d{9}$/,
  // 固定电话
  FIX_PHONE: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/,
  // 输入框过滤 // 输入只允许包含下划线、数字、字母、中文，且不以下划线结尾或者开头
  INPUT_FILTER: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
  // 综管平台名称正则: 汉字/英文字母/数字/英文符号【-()_】,16个字符
  IMP_NAME: /^[a-zA-Z0-9-()_\u4e00-\u9fa5]{1,16}$/,
  // 型号和软件版本 由英文字母/数字/汉字/“-”/“_”/“.”组成，1-20位
  MODEL_VERSION: /^[a-zA-Z0-9-_.\u4e00-\u9fa5]{1,20}$/,
  // 域名 // 域名正则校验，由根域、顶级域、二级、三级……域名构成，每级域名之间用点分开，每级域名由字母、数字和减号构成（第一个字母不能是减号），不区分大小写，长度不超过63。
  DOMAIN: /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+?$/,
  // IP 范围
  IP_RANGE: /^(([0,1]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}([0,1]?\d{1,2}|2[0-4]\d|25[0-5])(\/(16|24))$/,
  // 白名单用户输入校验规则
  WHITE_LIST_RULE_FILL: /^[0-9:,]*$/g,
  // 关联验证码，8 位，只允许包含数字和英文字母
  RELATION_CODE: /^[A-Za-z0-9]{8}$/,
  // 产品名称，只允许输入中英文
  PRODUCT_NAME: /^[\u0391-\uFFE5A-Za-z]+$/,
  // CVE/CNNVD编号 字母、数字、“空格”、“-”、“_”，限制20位以内
  SERIAL_NUMBER: /^[a-zA-Z0-9-_ ]{1,20}$/,
  // 漏洞名称 汉字、字母、数字、“空格”、“-”、“_”，限制30位以内
  LOOP_NAME: /^[a-zA-Z0-9-_\u4e00-\u9fa5 ]{1,30}$/,
  // ip范围 0~255.0~255.0~255.0~255/0~32
  IP_RANGE_32: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\/(?:\d|[12]\d|3[012])$/,
  // 仅英文数字
  ENGLISH_NUMBER: '^[a-zA-Z0-9]{min,max}$',
  // 规则名称 中文/英文/数字/下划线组成，不可以下划线开头
  RULE_NAME_NO_LENGTH: '^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5]{min,max}$',
  // x~y 的【英文字母/16进制字符】
  BYTE_CHARACTERISTICS: '^(?:[a-zA-Z]{min,max}|[0-9a-fA-F]{min,max})$',
  // 通用名称 输入只允许包含下划线、数字、字母、中文，且不以下划线结尾或者开头
  COMMON_NAME: '^(?!_)[a-zA-Z0-9_\u4e00-\u9fa5]{min,max}$',
  // 特殊字符校验 仅允许 数字、字母、下划线、-、空格、.、:
  // eslint-disable-next-line no-useless-escape
  SPCHAR: /^[-\.:\w\s]+$/, // /[-_\+=,\.;'\?\[\]{}~\!@#\$%\^&\(\)]/, // ~ ! @ # $ % ^ & ( )- _ + = , . ; ' ? ] [ } {
  // 汉字、字母、数字、"空格"、"-"、"_"
  // eslint-disable-next-line no-useless-escape
  SEARCH: /^[-\.:\w\s\u4e00-\u9fa5]+$/,
  // 十六进制
  HEX: /^[0-9a-fA-F]+$/,
  ENGNUM: /^[a-zA-Z0-9]+$/,
  // app验证码，10 位，只允许包含数字和英文字母
  APP_CODE: /^[0-9]{1,10}$/

}
  export default validateRules