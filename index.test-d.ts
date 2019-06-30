import {expectType, expectError} from 'tsd';
import xdg = require('.');

expectType<string>(xdg.cache);
expectType<string>(xdg.config);
expectType<string>(xdg.data);
expectType<string | undefined>(xdg.runtime);
expectType<string>(xdg.state);

expectType<readonly string[]>(xdg.configDirs);
expectType<readonly string[]>(xdg.dataDirs);
