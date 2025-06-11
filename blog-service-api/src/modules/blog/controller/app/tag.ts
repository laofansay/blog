import { BlogPostService } from '../../service/post';
import { Get, Inject, Query, Param, Provide } from '@midwayjs/core';
import { Like } from 'typeorm';
import { BlogTagService } from '../../service/tag';
import {
  CoolController,
  BaseController,
  CoolUrlTag,
  TagTypes,
} from '@cool-midway/core';
import { BlogTagEntity } from '../../entity/tag';
/**
 * 博客文章
 */
@CoolController({
  api: ['info', 'list', 'page'],
  entity: BlogTagEntity,
  service: BlogTagService,
  pageQueryOp: {
    fieldEq: ['status', 'parentId'],
    keyWordLikeFields: ['name'],
  },
})
@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['list', 'page', 'info'],
})
export class AppBlogTagController extends BaseController {}
