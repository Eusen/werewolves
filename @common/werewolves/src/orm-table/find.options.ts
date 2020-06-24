import {Op} from './operators';

export type WhereOptions = WhereAttributeHash | AndOperator | OrOperator | Literal | Where;

export interface Where {
  attribute?: object;
  comparator?: string;
  logic?: string | object;
}

export interface Col {
  col?: any;
}

export interface Fn {
  clone(): this;
}

export interface Literal {
  val?: any;
}

export interface AnyOperator {
  [Op.any]: (string | number)[];
}

export interface AllOperator {
  [Op.all]: (string | number | Date | Literal)[];
}

export type Rangable = [number, number] | [Date, Date] | Literal;

/**
 * Operators that can be used in WhereOptions
 *
 * See https://sequelize.org/master/en/v3/docs/querying/#operators
 */
export interface WhereOperators {
  /**
   * Example: `[Op.any]: [2,3]` becomes `ANY ARRAY[2, 3]::INTEGER`
   *
   * _PG only_
   */
  [Op.any]?: (string | number | Literal)[] | Literal;

  /** Example: `[Op.gte]: 6,` becomes `>= 6` */
  [Op.gte]?: number | string | Date | Literal;

  /** Example: `[Op.lt]: 10,` becomes `< 10` */
  [Op.lt]?: number | string | Date | Literal;

  /** Example: `[Op.lte]: 10,` becomes `<= 10` */
  [Op.lte]?: number | string | Date | Literal;

  /** Example: `[Op.ne]: 20,` becomes `!= 20` */
  [Op.ne]?: string | number | Literal | WhereOperators;

  /** Example: `[Op.not]: true,` becomes `IS NOT TRUE` */
  [Op.not]?: boolean | string | number |  Literal | WhereOperators;

  /** Example: `[Op.between]: [6, 10],` becomes `BETWEEN 6 AND 10` */
  [Op.between]?: [number, number];

  /** Example: `[Op.in]: [1, 2],` becomes `IN [1, 2]` */
  [Op.in]?: (string | number | Literal)[] | Literal;

  /** Example: `[Op.notIn]: [1, 2],` becomes `NOT IN [1, 2]` */
  [Op.notIn]?: (string | number | Literal)[] | Literal;

  /**
   * Examples:
   *  - `[Op.like]: '%hat',` becomes `LIKE '%hat'`
   *  - `[Op.like]: { [Op.any]: ['cat', 'hat']}` becomes `LIKE ANY ARRAY['cat', 'hat']`
   */
  [Op.like]?: string | Literal | AnyOperator | AllOperator;

  /**
   * Examples:
   *  - `[Op.notLike]: '%hat'` becomes `NOT LIKE '%hat'`
   *  - `[Op.notLike]: { [Op.any]: ['cat', 'hat']}` becomes `NOT LIKE ANY ARRAY['cat', 'hat']`
   */
  [Op.notLike]?: string | Literal | AnyOperator | AllOperator;

  /**
   * case insensitive PG only
   *
   * Examples:
   *  - `[Op.iLike]: '%hat'` becomes `ILIKE '%hat'`
   *  - `[Op.iLike]: { [Op.any]: ['cat', 'hat']}` becomes `ILIKE ANY ARRAY['cat', 'hat']`
   */
  [Op.iLike]?: string | Literal | AnyOperator | AllOperator;

  /**
   * PG array overlap operator
   *
   * Example: `[Op.overlap]: [1, 2]` becomes `&& [1, 2]`
   */
  [Op.overlap]?: Rangable;

  /**
   * PG array contains operator
   *
   * Example: `[Op.contains]: [1, 2]` becomes `@> [1, 2]`
   */
  [Op.contains]?: (string | number)[] | Rangable;

  /**
   * PG array contained by operator
   *
   * Example: `[Op.contained]: [1, 2]` becomes `<@ [1, 2]`
   */
  [Op.contained]?: (string | number)[] | Rangable;

  /** Example: `[Op.gt]: 6,` becomes `> 6` */
  [Op.gt]?: number | string | Date | Literal;

  /**
   * PG only
   *
   * Examples:
   *  - `[Op.notILike]: '%hat'` becomes `NOT ILIKE '%hat'`
   *  - `[Op.notLike]: ['cat', 'hat']` becomes `LIKE ANY ARRAY['cat', 'hat']`
   */
  [Op.notILike]?: string | Literal | AnyOperator | AllOperator;

  /** Example: `[Op.notBetween]: [11, 15],` becomes `NOT BETWEEN 11 AND 15` */
  [Op.notBetween]?: [number, number];

  /**
   * Strings starts with value.
   */
  [Op.startsWith]?: string;

  /**
   * String ends with value.
   */
  [Op.endsWith]?: string;
  /**
   * String contains value.
   */
  [Op.substring]?: string;

  /**
   * MySQL/PG only
   *
   * Matches regular expression, case sensitive
   *
   * Example: `[Op.regexp]: '^[h|a|t]'` becomes `REGEXP/~ '^[h|a|t]'`
   */
  [Op.regexp]?: string;

  /**
   * MySQL/PG only
   *
   * Does not match regular expression, case sensitive
   *
   * Example: `[Op.notRegexp]: '^[h|a|t]'` becomes `NOT REGEXP/!~ '^[h|a|t]'`
   */
  [Op.notRegexp]?: string;

  /**
   * PG only
   *
   * Matches regular expression, case insensitive
   *
   * Example: `[Op.iRegexp]: '^[h|a|t]'` becomes `~* '^[h|a|t]'`
   */
  [Op.iRegexp]?: string;

  /**
   * PG only
   *
   * Does not match regular expression, case insensitive
   *
   * Example: `[Op.notIRegexp]: '^[h|a|t]'` becomes `!~* '^[h|a|t]'`
   */
  [Op.notIRegexp]?: string;

  /**
   * PG only
   *
   * Forces the operator to be strictly left eg. `<< [a, b)`
   */
  [Op.strictLeft]?: Rangable;

  /**
   * PG only
   *
   * Forces the operator to be strictly right eg. `>> [a, b)`
   */
  [Op.strictRight]?: Rangable;

  /**
   * PG only
   *
   * Forces the operator to not extend the left eg. `&> [1, 2)`
   */
  [Op.noExtendLeft]?: Rangable;

  /**
   * PG only
   *
   * Forces the operator to not extend the left eg. `&< [1, 2)`
   */
  [Op.noExtendRight]?: Rangable;

}

/** Example: `[Op.or]: [{a: 5}, {a: 6}]` becomes `(a = 5 OR a = 6)` */
export interface OrOperator {
  [Op.or]: WhereOptions | WhereOptions[] | WhereValue | WhereValue[];
}

/** Example: `[Op.and]: {a: 5}` becomes `AND (a = 5)` */
export interface AndOperator {
  [Op.and]: WhereOptions | WhereOptions[] | WhereValue | WhereValue[];
}

/**
 * Where Geometry Options
 */
export interface WhereGeometryOptions {
  type: string;
  coordinates: (number[] | number)[];
}

/**
 * Used for the right hand side of WhereAttributeHash.
 * WhereAttributeHash is in there for JSON columns.
 */
export type WhereValue =
  | string // literal value
  | number // literal value
  | boolean // literal value
  | Date // literal value
  | null
  | WhereOperators
  | WhereAttributeHash // for JSON columns
  | Col // reference another column
  | Fn
  | OrOperator
  | AndOperator
  | WhereGeometryOptions
  | (string | number | WhereAttributeHash)[]; // implicit [Op.or]

/**
 * A hash of attributes to describe your search.
 */
export interface WhereAttributeHash {
  /**
   * Possible key values:
   * - A simple attribute name
   * - A nested key for JSON columns
   *
   *  {
   *    "meta.audio.length": {
   *      [Op.gt]: 20
   *    }
   *  }
   */
  [field: string]: WhereValue | WhereOptions;
}

export interface FindOptions {
  where?: WhereOptions;

  /**
   * A list of associations to eagerly load using a left join. Supported is either
   * `{ include: [ Model1, Model2, ...]}`, `{ include: [{ model: Model1, as: 'Alias' }]}` or
   * `{ include: [{ all: true }]}`.
   * If your association are set up with an `as` (eg. `X.hasMany(Y, { as: 'Z }`, you need to specify Z in
   * the as attribute when eager loading Y).
   */
  include?: any[];

  /**
   * Specifies an ordering. If a string is provided, it will be escaped. Using an array, you can provide
   * several columns / functions to order by. Each element can be further wrapped in a two-element array. The
   * first element is the column / function to order by, the second is the direction. For example:
   * `order: [['name', 'DESC']]`. In this way the column will be escaped, but the direction will not.
   */
  order?: any;

  /**
   * GROUP BY in sql
   */
  group?: any;

  /**
   * Limit the results
   */
  limit?: number;

  /**
   * Skip the results;
   */
  offset?: number;

  /**
   * Select group rows after groups and aggregates are computed.
   */
  having?: WhereOptions;

  pageSize?: number;
  pageIndex?: number;
}
