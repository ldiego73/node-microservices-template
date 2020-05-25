import S from 'fluent-schema';

const params = S.object().prop(
  'iso',
  S.string()
    .minLength(2)
    .maxLength(2)
    .required()
);

export const deleteSchema = {
  params,
};
