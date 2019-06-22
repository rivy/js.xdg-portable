import {expectType, expectError} from 'tsd';
import xdg = require('.');

expectType<string | undefined>(xdg.data);
expectError<string>(xdg.data);
expectType<string | undefined>(xdg.config);
expectError<string>(xdg.config);
expectType<string | undefined>(xdg.cache);
expectError<string>(xdg.cache);
expectType<string | undefined>(xdg.runtime);
expectError<string>(xdg.runtime);
expectType<readonly string[]>(xdg.configDirs);
expectError<string[]>(xdg.configDirs);
expectType<readonly string[]>(xdg.dataDirs);
expectError<string[]>(xdg.dataDirs);
