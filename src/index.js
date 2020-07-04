'use strict';

import { config } from '../build/config';
import { isA } from './isA';
import { isB } from './isB';
import { isS } from './isS';

const lib = {};

config.isA && ( lib.isA = isA );
config.isB && ( lib.isB = isB );
config.isS && ( lib.isB = isS );

export default lib;