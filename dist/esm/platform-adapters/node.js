import * as path from 'path';
import osPaths from 'os-paths';
export var adapter = {
    atImportPermissions: { env: true },
    env: {
        get: function (s) {
            return process.env[s];
        }
    },
    osPaths: osPaths,
    path: path,
    process: process
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wbGF0Zm9ybS1hZGFwdGVycy9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUkvQixNQUFNLENBQUMsSUFBTSxPQUFPLEdBQXFCO0lBQ3hDLG1CQUFtQixFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRTtJQUNsQyxHQUFHLEVBQUU7UUFDSixHQUFHLEVBQUUsVUFBQyxDQUFDO1lBRU4sT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7S0FDRDtJQUNELE9BQU8sU0FBQTtJQUNQLElBQUksTUFBQTtJQUNKLE9BQU8sU0FBQTtDQUNQLENBQUMifQ==