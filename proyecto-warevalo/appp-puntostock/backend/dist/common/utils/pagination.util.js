"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePagination = normalizePagination;
exports.buildPaginatedResult = buildPaginatedResult;
const pagination_constants_js_1 = require("../constants/pagination.constants.js");
function normalizePagination(page, limit) {
    const safePage = !page || page < 1
        ? pagination_constants_js_1.DEFAULT_PAGE
        : page;
    const safeLimit = !limit || limit < 1
        ? pagination_constants_js_1.DEFAULT_LIMIT
        : Math.min(limit, pagination_constants_js_1.MAX_LIMIT);
    const offset = (safePage - 1) * safeLimit;
    return {
        page: safePage,
        limit: safeLimit,
        offset,
    };
}
function buildPaginatedResult(items, total, page, limit) {
    return {
        items,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit) || 0,
        },
    };
}
//# sourceMappingURL=pagination.util.js.map