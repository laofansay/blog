import { BlogTagService } from '../../service/tag';
import {CoolController,BaseController} from '@cool-midway/core';
import { BlogTagEntity } from '../../entity/tag';
/**
 * 博客文章
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BlogTagEntity,
  service: BlogTagService,
  pageQueryOp: {
    fieldEq: ['status', 'parentId'],
    keyWordLikeFields: ['name'],
  },
})
export class AdminBlogTagController extends BaseController {}
