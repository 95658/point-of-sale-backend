#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4e51d1cea0ac6c23009b015988a01d9f90966fddc39e4738508eacb4879ddcb3/contract';
import startContract from '../../snapshots/4e51d1cea0ac6c23009b015988a01d9f90966fddc39e4738508eacb4879ddcb3/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/813da6575e0f275913432377c512078a09c0b68b43c83e76959c2a8185f0bc45/contract';
import endContract from '../../snapshots/813da6575e0f275913432377c512078a09c0b68b43c83e76959c2a8185f0bc45/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'Category',
        column: col('image', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Product',
        column: col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'Product',
        column: col('image', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
