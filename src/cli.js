/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check
'use strict';

import './bootstrap-cli.js'; // this MUST come before other imports as it changes global state
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as bootstrapNode from './bootstrap-node.js';
import * as bootstrapAmd from './bootstrap-amd.js';
import { resolveNLSConfiguration } from './vs/base/node/nls.js';
import { product } from './bootstrap-meta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function start() {

	// NLS
	const nlsConfiguration = await resolveNLSConfiguration({ userLocale: 'en', osLocale: 'en', commit: product.commit, userDataPath: '', nlsMetadataPath: __dirname });
	process.env['VSCODE_NLS_CONFIG'] = JSON.stringify(nlsConfiguration); // required for `bootstrap-amd` to pick up NLS messages

	// Enable portable support
	// @ts-ignore
	bootstrapNode.configurePortable(product);

	// Signal processes that we got launched as CLI
	process.env['VSCODE_CLI'] = '1';

	// Load CLI through AMD loader
	bootstrapAmd.load('vs/code/node/cli');
}

start();
