export const toDisplayKageData = (data: string | null) => data?.replaceAll('$', '\n') ?? '';
