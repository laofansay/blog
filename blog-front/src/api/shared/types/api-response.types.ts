/**
 * 通用API响应类型定义
 */

/**
 * API标准响应格式
 */
export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

/**
 * 分页响应类型
 */
export interface PageResponse<T> {
    list: T[];
    pagination: {
        page: number;
        size: number;
        total: number;
    };
} 