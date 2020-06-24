import {Sequelize, Options, SyncOptions, UpdateOptions} from "sequelize";
import KoaRouter = require("koa-router");
import {SequelizeModelClass} from "./sequelize.model";
import {FindOptions} from "sequelize/types/lib/model";
import {Responser} from '../../../koa/features/response/response.def';

export interface SequelizeOptions extends Options {
  models: SequelizeModelClass<any>[];
  isForceRefreshDatabase?: boolean;
}

export interface QueryOptions extends FindOptions {
  pageIndex?: number;
  pageSize?: number;
}

export class SequelizeAgent {
  readonly sequelize: Sequelize;
  protected readonly _models: SequelizeModelClass<any>[] = [];

  static create(opts: SequelizeOptions) {
    return new SequelizeAgent(opts);
  }

  protected constructor(protected opts: SequelizeOptions) {
    opts.models.forEach(m => this.setModel(m));

    this.sequelize = new Sequelize({
      ...opts,
      pool: {max: 500, min: 10},
      sync: {force: opts.isForceRefreshDatabase},
      define: {
        timestamps: true,
      }
    });
  }

  async init() {
    await this.authenticate();
    await this.syncModels();
  }

  async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  protected setModel(model: SequelizeModelClass<any>, isCover = false) {
    model.checkConfig();

    if (this._models.length > 1) {
      let hasSame = false;

      for (let i = 0; i < this._models.length; i++) {
        const m = this._models[i];
        if (!hasSame && (hasSame = m.isSame(model))) {
          if (isCover) this._models[i] = model;
          break;
        }
      }

      if (hasSame) return;
    }

    this._models.push(model);
  }

  getModel<T extends SequelizeModelClass<any>>(model: T): T {
    return this.sequelize.models[model.getModelName()] as any;
  }

  getModelByName<T extends SequelizeModelClass<any>>(modelName: string): T {
    return this.sequelize.models[modelName] as any;
  }

  syncModels(syncOptions: SyncOptions = this.opts.sync) {
    return new Promise((resolve, reject) => {
      this._models.forEach(model => {
        model.injectTo(this.sequelize);
      });
      this.sequelize.sync(syncOptions).then(resolve, reject);
    });
  }

  getRouter(authorise) {
    const router = new KoaRouter();
    router.prefix('/model');

    this._models.forEach(m => {
      const model = this.getModel(m);

      router.get(`/${model.tableName}/`, authorise, async context => {
        const find: QueryOptions = JSON.parse(context.query.find || '{}');

        if (!find.pageSize) find.pageSize = find.limit || 20;
        if (find.pageIndex >= 1) find.offset = (find.pageIndex - 1) * find.pageSize;

        find.limit = find.pageSize || 20;

        await model.findAll(find).then((resp) => {
          context.body = Responser.success({
            statusCode: 200,
            dataset: {
              pageIndex: find.pageIndex,
              pageSize: find.pageSize,
              results: resp,
            }
          });
        }, err => {
          Responser.throw(context, {
            statusCode: 500,
            message: err
          });
        });
      });

      router.get(`/${model.tableName}/:id/`, authorise, async context => {
        const find: FindOptions = JSON.parse(context.query.find || '{}');
        find.where = {id: context.params.id};

        await model.findOne(find).then((resp) => {
          context.body = Responser.success({
            statusCode: 200,
            data: resp,
          });
        }, err => {
          Responser.throw(context, {
            statusCode: 500,
            message: err.message,
          });
        });
      });

      router.post(`/${model.tableName}/`, authorise, async context => {
        await model.create(context.request.body).then((resp) => {
          context.body = Responser.success({
            data: resp,
          });
        }, err => {
          Responser.throw(context, {
            statusCode: 500,
            message: err.message,
          });
        });
      });

      router.patch(`/${model.tableName}/:id/`, authorise, async context => {
        const find: UpdateOptions = JSON.parse(context.query.find || '{}');
        find.where = {id: context.params.id};
        find.returning = true;

        await model.update(context.request.body, find).then(async () => {
          const user = await model.findOne(find);
          context.body = Responser.success({
            statusCode: 200,
            data: user.toJSON(),
          });
        }, err => {
          Responser.throw(context, {
            statusCode: 500,
            message: err.message,
          });
        });
      });

      router.delete(`/${model.tableName}/:id/`, authorise, async context => {
        await model.destroy({where: {id: context.params.id}}).then((resp) => {
          context.body = Responser.success({
            statusCode: 200,
          });
        }, err => {
          Responser.throw(context, {
            statusCode: 500,
            message: err.message,
          });
        });
      });
    });

    return router;
  }
}
