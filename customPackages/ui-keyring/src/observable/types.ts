// Copyright 2017-2024 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BehaviorSubject } from "rxjs";
import type { KeypairType } from "@polkadot/util-crypto/types";
import type { KeyringSectionOption } from "../options/types";
import type { KeyringJson, KeyringStore } from "../types";

export interface SingleAddress {
  json: KeyringJson;
  option: KeyringSectionOption;
  type?: KeypairType | undefined;
}

export type SubjectInfo = Record<string, SingleAddress>;

export interface AddressSubject {
  add: (
    store: KeyringStore,
    address: string,
    json: KeyringJson,
    type?: KeypairType
  ) => SingleAddress;
  remove: (store: KeyringStore, address: string) => void;
  subject: BehaviorSubject<SubjectInfo>;
}
