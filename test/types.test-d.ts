import {expectType} from 'tsd';
import xdg = require('../src/lib');

expectType<typeof xdg>(xdg());

expectType<string>(xdg.cache());
expectType<string>(xdg.config());
expectType<string>(xdg.data());
expectType<string | undefined>(xdg.runtime());
expectType<string>(xdg.state());

expectType<readonly string[]>(xdg.configDirs());
expectType<readonly string[]>(xdg.dataDirs());
