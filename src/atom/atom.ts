import { atom } from "jotai";

const mapDefaultStyle = 'mapir-style-dark';
const mapStyleAtom = atom<string>(`https://map.ir/vector/styles/main/${mapDefaultStyle}.json`);

export { mapStyleAtom };
