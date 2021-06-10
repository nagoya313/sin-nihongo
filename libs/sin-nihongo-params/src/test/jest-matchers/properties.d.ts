declare namespace jest {
  interface Matchers<R, Target> {
    isOptionalProperty(property: keyof InstanceType<Target>): Promise<R>;
    isIntProperty(property: keyof InstanceType<Target>): Promise<R>;
    minProperty(property: keyof InstanceType<Target>, min: number): Promise<R>;
    maxProperty(property: keyof InstanceType<Target>, min: number): Promise<R>;
    allowValueProperty(property: keyof InstanceType<Target>, value: unknown): Promise<R>;
  }
}
