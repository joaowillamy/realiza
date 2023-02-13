import { SelectQueryBuilder } from 'typeorm';

type EntityObject = { [key: string]: any };

export const baseQueryBuilder = <Entity extends EntityObject>(
  query: SelectQueryBuilder<Entity>,
  sort: string,
  page = 1,
  limit = 100
) => {
  page = page < 1 ? 1 : page;
  limit = limit > 100 ? 100 : limit;
  sort = sort ? JSON.parse(sort) : undefined;

  query.skip((page - 1) * limit);
  query.take(+limit);
  query.orderBy(sort);
};
