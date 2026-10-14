#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/193d61beecfffe1e37e3f900be7e49bf119b17335de28356cc16370c9a8e9e7c/contract';
import startContract from '../../snapshots/193d61beecfffe1e37e3f900be7e49bf119b17335de28356cc16370c9a8e9e7c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/4e51d1cea0ac6c23009b015988a01d9f90966fddc39e4738508eacb4879ddcb3/contract';
import endContract from '../../snapshots/4e51d1cea0ac6c23009b015988a01d9f90966fddc39e4738508eacb4879ddcb3/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'User',
        column: col('role', 'text', {
          notNull: true,
          default: lit('cashier'),
          codecRef: { codecId: 'pg/text@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
