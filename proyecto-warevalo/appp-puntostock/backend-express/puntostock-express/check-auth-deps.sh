#!/bin/bash
for f in \
  src/features/auth/role/role.model.ts \
  src/features/auth/resource/resource.model.ts \
  src/features/auth/role-user/role-user.model.ts \
  src/features/auth/resource-role/resource-role.model.ts \
  src/features/auth/resource-role/resource-role.service.ts \
  src/features/auth/resource-role/dto/index.ts \
  src/features/auth/refresh-token/refresh-token.model.ts \
  src/features/auth/access/index.ts \
  src/features/auth/access/authenticate.ts \
  src/features/auth/access/authorize.ts \
; do
  test -f "$f" && echo "OK    $f" || echo "FALTA $f"
done
