export interface ValidationError {
  readonly property: string;
  readonly value: string;
  readonly constraints: Record<string, string>;
}

export interface ApiError {
  readonly name: string;
  readonly message: string;
  readonly errors?: ValidationError;
}
