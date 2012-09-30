var proxy = require("proxy-stream")

module.exports = map

function map(stream, iterator) {
    var proxied = proxy(stream, transformation)

    return proxied

    function transformation(chunk, next, end) {
        if (iterator.length === 2) {
            iterator(chunk, callback)
        } else {
            next(iterator(chunk))
            end()
        }

        function callback(err, result) {
            if (err) {
                return proxied.emit("error", err)
            }

            next(result)
            end()
        }
    }
}
