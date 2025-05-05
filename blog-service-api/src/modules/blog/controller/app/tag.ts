import { CoolController, BaseController, CoolTag, TagTypes } from '@cool-midway/core';
import { BlogPostEntity } from '../../entity/post';
import { BlogPostService } from '../../service/post';
import { Get, Inject, Query, Param, Provide } from '@midwayjs/core';
import { Like } from 'typeorm';
import { BlogTagService } from '../../service/tag';

/**
 * 博客文章
 */
@Provide()
@CoolController()
export class AppBlogTagController extends BaseController {

    @Inject()
    blogTagService: BlogTagService;


    /**
     * 文章分页查询
     */
    @Get('/')
    @CoolTag(TagTypes.IGNORE_TOKEN)
    async search(@Query() query: any) {
        const result = await this.blogTagService.pageQuery(query);
        return this.ok(result);
    }

} 