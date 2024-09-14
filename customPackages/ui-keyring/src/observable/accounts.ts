// Copyright 2017-2024 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { accountKey } from "../defaults";
import { genericSubject } from "./genericSubject";

export const accounts = /*#__PURE__*/ genericSubject(accountKey, true);
