import { CoolController, BaseController } from '@cool-midway/core';
import { BlogPostEntity } from '../../entity/post';
import { BlogPostService } from '../../service/post';
import { Get } from '@midwayjs/core';

/**
 * 博客文章
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BlogPostEntity,
  service: BlogPostService,
  pageQueryOp: {
    fieldEq: ['status', 'categoryId'],
    keyWordLikeFields: ['title', 'summary'],
  },
})
export class AdminBlogPostController extends BaseController {
  /**
   * 发布文章
   */
  @Get('/publish/:id')
  async publish(id: number) {
    return this.service.BlogPostService.publish(id);
  }
}
