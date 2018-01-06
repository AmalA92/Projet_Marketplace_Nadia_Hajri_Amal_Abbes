module.exports.paginate = function paginate(array, page_size, page_number) {
    --page_number // because pages logically start with 1, but technically with 0
    return {
        docs: array.slice(page_number * page_size, (page_number + 1) * page_size),
        pages: Math.ceil(array.length / page_size),
        page: page_number + 1
    }
}
