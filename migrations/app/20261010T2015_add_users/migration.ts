#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/193d61beecfffe1e37e3f900be7e49bf119b17335de28356cc16370c9a8e9e7c/contract';
import endContract from '../../snapshots/193d61beecfffe1e37e3f900be7e49bf119b17335de28356cc16370c9a8e9e7c/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/2921eb0a05f5020fc8f383d38f414cb1d396e07d531cd044bff68db66ac4e28b/contract';
import startContract from '../../snapshots/2921eb0a05f5020fc8f383d38f414cb1d396e07d531cd044bff68db66ac4e28b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('password', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
