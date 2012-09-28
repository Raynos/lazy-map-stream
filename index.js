var proxy = require("proxy-stream")

module.exports = map

function map(stream, iterator) {
    return proxy(stream, transformation)

    function transformation(chunk, next) {
        next(iterator(chunk))
    }
}
