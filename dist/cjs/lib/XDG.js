"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.Adapt = void 0;
function Adapt(adapter_) {
    var env = adapter_.env, osPaths = adapter_.osPaths, path = adapter_.path;
    var isMacOS = /^darwin$/i.test(adapter_.process.platform);
    var isWinOS = /^win/i.test(adapter_.process.platform);
    function baseDir() {
        return osPaths.home() || osPaths.temp();
    }
    function valOrPath(val, pathSegments) {
        return val || path.join.apply(path, pathSegments);
    }
    var linux = function () {
        var cache = function () { return valOrPath(env.get('XDG_CACHE_HOME'), [baseDir(), '.cache']); };
        var config = function () { return valOrPath(env.get('XDG_CONFIG_HOME'), [baseDir(), '.config']); };
        var data = function () { return valOrPath(env.get('XDG_DATA_HOME'), [baseDir(), '.local', 'share']); };
        var runtime = function () { return env.get('XDG_RUNTIME_DIR') || void 0; };
        var state = function () { return valOrPath(env.get('XDG_STATE_HOME'), [baseDir(), '.local', 'state']); };
        return { cache: cache, config: config, data: data, runtime: runtime, state: state };
    };
    var macos = function () {
        var cache = function () { return valOrPath(env.get('XDG_CACHE_HOME'), [baseDir(), 'Library', 'Caches']); };
        var config = function () {
            return valOrPath(env.get('XDG_CONFIG_HOME'), [baseDir(), 'Library', 'Preferences']);
        };
        var data = function () {
            return valOrPath(env.get('XDG_DATA_HOME'), [baseDir(), 'Library', 'Application Support']);
        };
        var runtime = function () { return env.get('XDG_RUNTIME_DIR') || void 0; };
        var state = function () { return valOrPath(env.get('XDG_STATE_HOME'), [baseDir(), 'Library', 'State']); };
        return { cache: cache, config: config, data: data, runtime: runtime, state: state };
    };
    var windows = function () {
        function appData() {
            return valOrPath(env.get('APPDATA'), [baseDir(), 'AppData', 'Roaming']);
        }
        function localAppData() {
            return valOrPath(env.get('LOCALAPPDATA'), [baseDir(), 'AppData', 'Local']);
        }
        var cache = function () { return valOrPath(env.get('XDG_CACHE_HOME'), [localAppData(), 'xdg.cache']); };
        var config = function () { return valOrPath(env.get('XDG_CONFIG_HOME'), [appData(), 'xdg.config']); };
        var data = function () { return valOrPath(env.get('XDG_DATA_HOME'), [appData(), 'xdg.data']); };
        var runtime = function () { return env.get('XDG_RUNTIME_DIR') || void 0; };
        var state = function () { return valOrPath(env.get('XDG_STATE_HOME'), [localAppData(), 'xdg.state']); };
        return { cache: cache, config: config, data: data, runtime: runtime, state: state };
    };
    var XDG_ = (function () {
        function XDG_() {
            function XDG() {
                return new XDG_();
            }
            var extension = isMacOS ? macos() : isWinOS ? windows() : linux();
            XDG.cache = extension.cache;
            XDG.config = extension.config;
            XDG.data = extension.data;
            XDG.runtime = extension.runtime;
            XDG.state = extension.state;
            XDG.configDirs = function configDirs() {
                var pathList = env.get('XDG_CONFIG_DIRS');
                return __spreadArray([extension.config()], (pathList ? pathList.split(path.delimiter) : []));
            };
            XDG.dataDirs = function dataDirs() {
                var pathList = env.get('XDG_DATA_DIRS');
                return __spreadArray([extension.data()], (pathList ? pathList.split(path.delimiter) : []));
            };
            return XDG;
        }
        return XDG_;
    }());
    return { XDG: new XDG_() };
}
exports.Adapt = Adapt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWERHLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9YREcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUErQ0EsU0FBUyxLQUFLLENBQUMsUUFBMEI7SUFDaEMsSUFBQSxHQUFHLEdBQW9CLFFBQVEsSUFBNUIsRUFBRSxPQUFPLEdBQVcsUUFBUSxRQUFuQixFQUFFLElBQUksR0FBSyxRQUFRLEtBQWIsQ0FBYztJQUV4QyxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXhELFNBQVMsT0FBTztRQUNmLE9BQU8sT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsU0FBUyxTQUFTLENBQUMsR0FBdUIsRUFBRSxZQUErQjtRQUMxRSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxPQUFULElBQUksRUFBUyxZQUFZLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBTSxLQUFLLEdBQUc7UUFDYixJQUFNLEtBQUssR0FBRyxjQUFNLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQTNELENBQTJELENBQUM7UUFDaEYsSUFBTSxNQUFNLEdBQUcsY0FBTSxPQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUE3RCxDQUE2RCxDQUFDO1FBQ25GLElBQU0sSUFBSSxHQUFHLGNBQU0sT0FBQSxTQUFT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