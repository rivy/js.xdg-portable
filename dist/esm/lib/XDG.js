var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
                return __spreadArrays([extension.config()], (pathList ? pathList.split(path.delimiter) : []));
            };
            XDG.dataDirs = function dataDirs() {
                var pathList = env.get('XDG_DATA_DIRS');
                return __spreadArrays([extension.data()], (pathList ? pathList.split(path.delimiter) : []));
            };
            return XDG;
        }
        return XDG_;
    }());
    return { XDG: new XDG_() };
}
export { Adapt };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWERHLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9YREcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQStDQSxTQUFTLEtBQUssQ0FBQyxRQUEwQjtJQUNoQyxJQUFBLEdBQUcsR0FBb0IsUUFBUSxJQUE1QixFQUFFLE9BQU8sR0FBVyxRQUFRLFFBQW5CLEVBQUUsSUFBSSxHQUFLLFFBQVEsS0FBYixDQUFjO0lBRXhDLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1RCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFeEQsU0FBUyxPQUFPO1FBQ2YsT0FBTyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxHQUF1QixFQUFFLFlBQStCO1FBQzFFLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLE9BQVQsSUFBSSxFQUFTLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFNLEtBQUssR0FBRztRQUNiLElBQU0sS0FBSyxHQUFHLGNBQU0sT0FBQSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBM0QsQ0FBMkQsQ0FBQztRQUNoRixJQUFNLE1BQU0sR0FBRyxjQUFNLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQTdELENBQTZELENBQUM7UUFDbkYsSUFBTSxJQUFJLEdBQUcsY0FBTSxPQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQW5FLENBQW1FLENBQUM7UUFDdkYsSUFBTSxPQUFPLEdBQUcsY0FBTSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztRQUMzRCxJQUFNLEtBQUssR0FBRyxjQUFNLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFwRSxDQUFvRSxDQUFDO1FBRXpGLE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDO0lBQ2hELENBQUMsQ0FBQztJQUVGLElBQU0sS0FBSyxHQUFHO1FBQ2IsSUFBTSxLQUFLLEdBQUcsY0FBTSxPQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBdEUsQ0FBc0UsQ0FBQztRQUMzRixJQUFNLE1BQU0sR0FBRztZQUNkLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUE1RSxDQUE0RSxDQUFDO1FBQzlFLElBQU0sSUFBSSxHQUFHO1lBQ1osT0FBQSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQWxGLENBQWtGLENBQUM7UUFDcEYsSUFBTSxPQUFPLEdBQUcsY0FBTSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztRQUMzRCxJQUFNLEtBQUssR0FBRyxjQUFNLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFyRSxDQUFxRSxDQUFDO1FBRTFGLE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDO0lBQ2hELENBQUMsQ0FBQztJQUVGLElBQU0sT0FBTyxHQUFHO1FBSWYsU0FBUyxPQUFPO1lBRWYsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFDRCxTQUFTLFlBQVk7WUFFcEIsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFFRCxJQUFNLEtBQUssR0FBRyxjQUFNLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQW5FLENBQW1FLENBQUM7UUFDeEYsSUFBTSxNQUFNLEdBQUcsY0FBTSxPQUFBLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUFoRSxDQUFnRSxDQUFDO1FBQ3RGLElBQU0sSUFBSSxHQUFHLGNBQU0sT0FBQSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLEVBQTVELENBQTRELENBQUM7UUFDaEYsSUFBTSxPQUFPLEdBQUcsY0FBTSxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQztRQUMzRCxJQUFNLEtBQUssR0FBRyxjQUFNLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQW5FLENBQW1FLENBQUM7UUFFeEYsT0FBTyxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUM7SUFDaEQsQ0FBQyxDQUFDO0lBR0Y7UUFDQztZQUNDLFNBQVMsR0FBRztnQkFDWCxPQUFPLElBQUksSUFBSSxFQUFTLENBQUM7WUFDMUIsQ0FBQztZQUVELElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXBFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztZQUM1QixHQUFHLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDOUIsR0FBRyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNoQyxHQUFHLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7WUFFNUIsR0FBRyxDQUFDLFVBQVUsR0FBRyxTQUFTLFVBQVU7Z0JBQ25DLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDNUMsdUJBQVEsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDbEYsQ0FBQyxDQUFDO1lBRUYsR0FBRyxDQUFDLFFBQVEsR0FBRyxTQUFTLFFBQVE7Z0JBQy9CLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzFDLHVCQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2hGLENBQUMsQ0FBQztZQUVGLE9BQU8sR0FBRyxDQUFDO1FBQ1osQ0FBQztRQUNGLFdBQUM7SUFBRCxDQUFDLEFBMUJELElBMEJDO0lBQ0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBUyxFQUFFLENBQUM7QUFDbkMsQ0FBQztBQUdELE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyJ9