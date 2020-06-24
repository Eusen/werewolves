import {DataTypes, Model, Sequelize, Utils} from "sequelize";
import {
  ColumnOptions,
  ModelAttributeColumnReferencesOptions,
  ModelOptions,
  ModelValidateOptions
} from "sequelize/types/lib/model";
import {StringUtils, ObjectUtils} from "../../../utils";
import {DataType} from "sequelize/types/lib/data-types";

export type SequelizeModelClass<M extends SequelizeModel> = typeof SequelizeModel & { new(): M };

export interface SequelizeModelAttributeColumnOptions extends ColumnOptions {
  type?: DataType;
  unique?: boolean | string | { name: string; msg: string };
  primaryKey?: boolean;
  autoIncrement?: boolean;
  autoIncrementIdentity?: boolean;
  comment?: string;
  references?: ModelAttributeColumnReferencesOptions;
  onUpdate?: string;
  onDelete?: string;
  validate?: ModelValidateOptions;
  values?: string[];
  choices?: object;

  get?(): any;

  set?(value: any): void;
}

export type SequelizeModelAttributes<T> = {
  [name in keyof T]?: DataType | SequelizeModelAttributeColumnOptions;
}

export interface SequelizeModelConfig<T = any> {
  tableName: string;
  attributes: SequelizeModelAttributes<T>;
  options?: ModelOptions<any>;
}

export class SequelizeModel extends Model {
  static __config: SequelizeModelConfig;

  static get configTableName() {
    return this.__config.options.tableName;
  }

  static config<T extends Model>(this: SequelizeModelClass<T>, builder: (Types: typeof DataTypes) => SequelizeModelConfig<T>) {
    let {tableName, attributes, options} = builder(DataTypes);
    options = options || {};
    options.tableName = tableName || StringUtils.convertHumpToKebab(this.name);
    options.modelName = this.name;
    options.name = {
      singular: Utils.singularize(options.tableName),
      plural: Utils.pluralize(options.tableName),
    }
    options.paranoid = true;
    options.createdAt = 'created_at';
    options.updatedAt = 'updated_at';
    options.deletedAt = 'delete_at';

    if (!attributes['id']) {
      attributes['id'] = {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrementIdentity: true,
        autoIncrement: true,
        comment: 'ID',
      };
    }

    Object.keys(attributes).forEach(key => {
      const attr: SequelizeModelAttributeColumnOptions = attributes[key];
      if (attr.choices) {
        attr.values = ObjectUtils.convertEnumToKeys(attr.choices);
      }
    });

    this.__config = {tableName, attributes, options};
  }

  static checkConfig() {
    if (!this.__config) throw new Error(`Model ${this.name} has not config.`);
  }

  static isSame(model: SequelizeModelClass<any>) {
    return this.__config.options.modelName === model.__config.options.modelName;
  }

  static isNamed(name: string) {
    return this.__config.options.modelName === name;
  }

  static injectTo(sequelize: Sequelize) {
    this.init(this.__config.attributes as any, {
      ...this.__config.options,
      sequelize,
    });
  }

  static getModelName() {
    return this.__config.options.modelName;
  }

  static setModelName(name: string) {
    if (!this.__config) {
      this.__config = {
        tableName: '',
        attributes: {},
        options: {modelName: name},
      }
    } else {
      this.__config.options.modelName = name;
    }
  }
}
