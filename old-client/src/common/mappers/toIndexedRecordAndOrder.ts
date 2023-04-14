type EntityWithId = { id: string };

export type IndexedRecordAndOrder<Entity extends EntityWithId> = {
  order: string[];
  entities: Record<string, Entity>;
};

export const toIndexedRecordAndOrder = <Entity extends EntityWithId>(
  listOfObjects: Entity[],
): IndexedRecordAndOrder<Entity> => {
  const order = listOfObjects.map(({ id }) => id);
  const entities = listOfObjects.reduce(
    (entitiesRecord, entity) => ({
      ...entitiesRecord,
      [entity.id]: entity,
    }),
    {},
  );
  return { order, entities };
};
