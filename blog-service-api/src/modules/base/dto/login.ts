import { Rule, RuleType } from '@midwayjs/validate';
/**
 * 登录参数校验
 */
export class LoginDTO {
  // 用户名
  @Rule(RuleType.string().required())
  username: string;

  // 密码
  @Rule(RuleType.string().required())
  password: string;

  // 验证码ID
  @Rule(RuleType.string())
  captchaId: string;

  // 验证码
  @Rule(RuleType.string())
  verifyCode: number;

  // 记住我
  @Rule(RuleType.boolean())
  rememberMe: boolean;
}
