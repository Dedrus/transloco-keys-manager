import { BaseParams } from '../types';
import { messages } from '../messages';
import {isNil} from "../helpers/isNil";

interface AddKeysParams extends BaseParams {
  scopeAlias: string;
  keyWithoutScope: string;
}

export function addKey({ defaultValue, scopeToKeys, scopeAlias, keyWithoutScope, scopes }: AddKeysParams) {
  const scopePath = scopes.aliasToScope[scopeAlias];
  const keyWithScope = scopeAlias ? `${scopeAlias}.${keyWithoutScope}` : keyWithoutScope;
  const keyValue = isNil(defaultValue)
      ? `${messages.missingValue} '${keyWithScope}'`
      : defaultValue.replace('{{key}}', keyWithScope);

  if (scopePath) {
    if (!scopeToKeys[scopePath]) {
      scopeToKeys[scopePath] = {};
    }
    scopeToKeys[scopePath][keyWithoutScope] = keyValue;
  } else {
    scopeToKeys.__global[keyWithoutScope] = keyValue;
  }
}
