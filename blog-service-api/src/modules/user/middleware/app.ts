import { ALL, Config, Middleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { IMiddleware, Init, Inject } from '@midwayjs/core';
import * as jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import { CoolCommException, CoolUrlTagData, TagTypes } from '@cool-midway/core';
import { Utils } from '../../../comm/utils';

/**
 * 用户
 */
@Middleware()
export class UserMiddleware implements IMiddleware<Context, NextFunction> {
  @Config(ALL)
  coolConfig;

  @Inject()
  coolUrlTagData: CoolUrlTagData;

  @Config('module.user.jwt')
  jwtConfig;

  ignoreUrls: string[] = [];

  @Config('koa.globalPrefix')
  prefix;



  @Init()
  async init() {
    this.ignoreUrls = this.coolUrlTagData.byKey(TagTypes.IGNORE_TOKEN, 'app');
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      let { url } = ctx;
      url = url.replace(this.prefix, '').split('?')[0];
      if (_.startsWith(url, '/app/')) {
        const token = ctx.get('Authorization');
        try {
          ctx.user = jwt.verify(token, this.jwtConfig.secret);

          if (ctx.user.isRefresh) {
            throw new CoolCommException('登录失效~');
          }
        } catch (error) { }

      }
      await next();
    };
  }
}
