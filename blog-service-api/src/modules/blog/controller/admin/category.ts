import { CoolController, BaseController } from '@cool-midway/core';
import { BlogCategoryEntity } from '../../entity/category';
import { BlogCategoryService } from '../../service/category';

/**
 * 博客分类
 */
@CoolController({
    api: ['add', 'delete', 'update', 'info', 'list', 'page'],
    entity: BlogCategoryEntity,
    service: BlogCategoryService,
    pageQueryOp: {
        fieldEq: ['status', 'parentId'],
        keyWordLikeFields: ['name'],
    },
})
export class AdminBlogCategoryController extends BaseController { } 