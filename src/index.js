'use strict';

import { config } from '../build/config';
import { cls } from './cls';
import { has } from './has';

const lib = {};

config.cls && ( lib.cls = cls );
config.has && ( lib.has = has );

export default lib;