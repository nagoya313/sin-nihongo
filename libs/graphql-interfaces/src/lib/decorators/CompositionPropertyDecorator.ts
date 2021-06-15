export const CompositionPropertyDecorator = (...decorators: PropertyDecorator[]): PropertyDecorator => (
  target,
  propertyKey
) => decorators.reverse().forEach((decorator) => decorator(target, propertyKey));
