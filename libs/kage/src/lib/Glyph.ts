export type Glyph = { name: string; data: string };
export type GetterType<G extends Glyph> = (key: string) => Promise<G>;
