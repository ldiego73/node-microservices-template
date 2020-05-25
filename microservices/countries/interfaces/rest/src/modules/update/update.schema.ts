import S from 'fluent-schema';

const params = S.object().prop(
  'iso',
  S.string()
    .minLength(2)
    .maxLength(2)
    .required()
);

const body = S.object()
  .prop('name', S.string().required())
  .prop('iso', S.string().required())
  .prop('currency', S.string().required())
  .prop('status', S.boolean().required());

export const updateSchema = {
  params,
  body,
};
