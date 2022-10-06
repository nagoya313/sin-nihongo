import { atom } from 'jotai';

const sidebarAtom = atom(false);
export const isOpenSidebarAtom = atom((get) => get(sidebarAtom));
export const openSidebarAtom = atom(null, (_, set) => set(sidebarAtom, true));
export const closeSidebarAtom = atom(null, (_, set) => set(sidebarAtom, false));
