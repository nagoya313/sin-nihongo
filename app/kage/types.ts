export type Glyph = { name: string; data: string | null };
export type GetterType<TGlyph extends Glyph> = (key: string) => Promise<TGlyph>;
