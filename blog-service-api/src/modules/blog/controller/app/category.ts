import { BlogCategoryEntity } from '../../entity/category';
import { Get, Query, Inject, Provide } from '@midwayjs/core';
import { BlogCategoryService } from '../../service/category';
import {
  CoolController,
  BaseController,
  CoolUrlTag,
  TagTypes,
  CoolTag,
} from '@cool-midway/core';
/**
 * 博客分类
 */
@CoolController({
  api: ['info', 'list', 'page'],
  entity: BlogCategoryEntity,
  service: BlogCategoryService,
  pageQueryOp: {
    fieldEq: ['status', 'parentId'],
    keyWordLikeFields: ['name'],
  },
})
@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['list', 'page', 'info'],
})
export class AppBlogCategoryController extends BaseController {}
