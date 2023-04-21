/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
interface EntityWithId<IdType extends string = string> {
  id: IdType
}

export const toEntityById = <
  IdType extends string,
  Entity extends EntityWithId<IdType>
>(
    entityList: Entity[]
  ): Record<IdType, Entity> =>
    entityList.reduce<Record<IdType, Entity>>(
      (entityById, entity) => ({
        ...entityById,
        [entity.id]: entity
      }),
      {} as Record<IdType, Entity>
    )
