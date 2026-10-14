#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/2921eb0a05f5020fc8f383d38f414cb1d396e07d531cd044bff68db66ac4e28b/contract';
import endContract from '../../snapshots/2921eb0a05f5020fc8f383d38f414cb1d396e07d531cd044bff68db66ac4e28b/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/68550ac5a082af9df77b1cc6b817ed2434b3208d6476a847ceb15d25c5e4fccf/contract';
import startContract from '../../snapshots/68550ac5a082af9df77b1cc6b817ed2434b3208d6476a847ceb15d25c5e4fccf/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Category',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'Product',
        column: col('categoryId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.createIndex({
        schema: 'public',
        table: 'Product',
        index: 'Product_categoryId_idx_15c304f2',
        columns: ['categoryId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Product',
        foreignKey: {
          name: 'Product_categoryId_fkey',
          columns: ['categoryId'],
          references: { schema: 'public', table: 'Category', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
