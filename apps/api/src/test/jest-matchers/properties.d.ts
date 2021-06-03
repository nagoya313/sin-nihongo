declare namespace jest {
  interface Matchers<R, Target> {
    isOptionalProperty(property: keyof Target): Promise<R>;
    isIntProperty(property: keyof Target): Promise<R>;
    minProperty(property: keyof Target, min: number): Promise<R>;
    maxProperty(property: keyof Target, min: number): Promise<R>;
    allowValueProperty(property: keyof Target, value: unknown): Promise<R>;
  }
}
