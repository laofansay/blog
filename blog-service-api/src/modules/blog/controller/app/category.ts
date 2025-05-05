import { CoolController, BaseController, CoolTag, TagTypes, CoolUrlTag } from '@cool-midway/core';
import { BlogCategoryEntity } from '../../entity/category';
import { Get, Query, Inject, Provide } from '@midwayjs/core';
import { BlogCategoryService } from '../../service/category';

/**
 * 博客分类
 */
@Provide()
@CoolController()
// @CoolUrlTag({
//     key: TagTypes.IGNORE_TOKEN,
//     value: ['list', 'page']
// })
export class AppBlogCategoryController extends BaseController {

    @Inject()
    blogCategoryService: BlogCategoryService;

    /**
     * 获取所有启用的分类
     */
    @Get('/all')
    @CoolTag(TagTypes.IGNORE_TOKEN)
    async getAllCategories() {
        // 查询所有状态为启用的分类
        const categoriesResult = await this.service.find(BlogCategoryEntity, {
            where: { status: 1 },
            order: {
                orderNum: 'ASC',
            },
        });

        return this.ok(categoriesResult);
    }

    /**
     * 重写list方法，添加IGNORE_TOKEN标记
     */
    @Get('/')
    @CoolTag(TagTypes.IGNORE_TOKEN)
    async list1(@Query() query: any) {
        const result = await this.blogCategoryService.pageQuery(query);
        return this.ok(result);
    }

    /**
     * 重写page方法，添加IGNORE_TOKEN标记
     */
    @Get('/page')
    @CoolTag(TagTypes.IGNORE_TOKEN)
    async page1s(@Query() query) {
        return this.page();
    }
} 