export type TableClass = typeof Table;

export abstract class Table<T = any> {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;

  protected static tableName: string;

  static setTableName(name: string) {
    if (!/^[A-Za-z0-9-_]+$/.test(name)) throw new Error('表名只能由英文数字和下划线构成');
    this.tableName = name;
  }

  static getTableName() {
    if (!this.tableName) throw new Error(`表 ${this.name} 必须设置表名`);
    return this.tableName;
  }

  constructor(data?: { [key in keyof T]?: any }) {
    Object.assign(this, data);
  }
}
