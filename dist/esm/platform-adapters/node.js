import * as path from 'path';
import osPaths from 'os-paths';
export var adapter = {
    env: {
        get: function (s) {
            return process.env[s];
        }
    },
    osPaths: osPaths,
    path: path,
    process: process
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wbGF0Zm9ybS1hZGFwdGVycy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUkvQixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQXFCO0lBQ3hDLEdBQUcsRUFBRTtRQUNKLEdBQUcsRUFBRSxVQUFDLENBQUM7WUFFTixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztLQUNEO0lBQ0QsT0FBTyxTQUFBO0lBQ1AsSUFBSSxNQUFBO0lBQ0osT0FBTyxTQUFBO0NBQ1AsQ0FBQyJ9