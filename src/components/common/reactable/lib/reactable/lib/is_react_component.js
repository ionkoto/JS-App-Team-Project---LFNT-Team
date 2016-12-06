// this is a bit hacky - it'd be nice if React exposed an API for this


Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.isReactComponent = isReactComponent;

function isReactComponent(thing) {
    return thing !== null && typeof thing === 'object' && typeof thing.props !== 'undefined';
}
