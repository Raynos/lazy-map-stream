var through = require("through-stream")
    , reemit = require("re-emitter").reemit

module.exports = map

function map(stream, iterator) {
    var mapped = through(write, read, stream.end)

    reemit(stream, mapped, ["readable", "drain", "end"])

    mapped.writable = stream.writable
    mapped.readable = stream.readable

    mapped.pipe = pipe

    return mapped

    function write(chunk) {
        return stream.write(iterator(chunk))
    }

    function read(bytes) {
        var chunk = stream.read(bytes)
        return chunk === null ? null : iterator(chunk)
    }

    function pipe(target) {
        var mapper = through(writeChunk)
        mapper.pipe(target)
        stream.pipe(mapper)
        return target
    }

    function writeChunk(chunk, buffer) {
        buffer.push(iterator(chunk))
    }
}