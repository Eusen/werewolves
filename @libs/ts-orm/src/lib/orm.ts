import {Options, Sequelize, SyncOptions} from 'sequelize';

export class Tsorm {
  private static tsorms: { [name: string]: Tsorm } = {};
  private ctx: Sequelize;


  static create(domain: any, options: Options & {sync?: SyncOptions}) {
    if (!this.tsorms[name]) {
      this.tsorms[name] = new Tsorm(options);
    } else {
      this.tsorms[name].updateOptions(options);
    }

    return this.tsorms[name].setDomin(domain).sync(options.sync);
  }

  constructor(protected options: Options) {
    this.ctx = new Sequelize(options);
  }

  protected updateOptions(options: Options) {
    this.options = options;
  }

  private setDomin(domian: any) {
    return this;
  }

  sync(syncOptions: SyncOptions): Promise<any> {
    return this.ctx.sync(syncOptions);
  }
}
