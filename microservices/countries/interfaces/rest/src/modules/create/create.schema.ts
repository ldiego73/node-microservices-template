import S from 'fluent-schema';

const body = S.object()
  .prop('name', S.string().required())
  .prop('iso', S.string().required())
  .prop('currency', S.string().required())
  .prop('status', S.boolean().required());

export const createSchema = {
  body,
};
