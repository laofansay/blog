import { CoolController, BaseController, CoolTag, TagTypes } from '@cool-midway/core';
import { BlogPostEntity } from '../../entity/post';
import { BlogPostService } from '../../service/post';
import { Get, Inject, Query, Param, Provide } from '@midwayjs/core';
import { Like } from 'typeorm';

/**
 * 博客文章
 */
@Provide()
@CoolController()
export class AppBlogPostController extends BaseController {

    @Inject()
    blogPostService: BlogPostService;

    /**
     * 查看文章
     */
    @Get('/:id')
    @CoolTag(TagTypes.IGNORE_TOKEN)
    async view(@Param('id') id: string) {
        // 确保id是数字
        const postId = parseInt(id);
        if (isNaN(postId)) {
            return this.fail('Invalid blog post ID');
        }

        await this.blogPostService.addViewCount(postId);
        const info = await this.blogPostService.info({
            id: postId,
        });
        return this.ok(info);
    }

    /**
     * 文章分页查询
     */
    @Get('/')
    @CoolTag(TagTypes.IGNORE_TOKEN)
    async search(@Query() query: any) {
        const result = await this.blogPostService.pageQuery(query);
        return this.ok(result);
    }

} 