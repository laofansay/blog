import { BlogPostEntity } from '../../entity/post';
import { BlogPostService } from '../../service/post';
import {
  CoolController,
  BaseController,
  CoolUrlTag,
  TagTypes,
  CoolTag,
} from '@cool-midway/core';
/**
 * 博客文章
 */
@CoolController({
  api: ['info', 'list', 'page'],
  entity: BlogPostEntity,
  service: BlogPostService,
  pageQueryOp: {
    fieldEq: ['status', 'parentId'],
    keyWordLikeFields: ['name'],
  },
})
@CoolUrlTag({
  key: TagTypes.IGNORE_TOKEN,
  value: ['list', 'page', 'info'],
})
export class AppBlogPostController extends BaseController {}
