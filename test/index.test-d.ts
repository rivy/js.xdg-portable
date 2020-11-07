import {expectType, expectError} from 'tsd';
import xdg = require('..');

expectType<typeof xdg>(xdg());

expectType<string>(xdg.cache());
expectType<string>(xdg.config());
expectType<string>(xdg.data());
expectType<string | undefined>(xdg.runtime());
expectType<string>(xdg.state());

expectType<string[]>(xdg.configDirs());
expectType<string[]>(xdg.dataDirs());
