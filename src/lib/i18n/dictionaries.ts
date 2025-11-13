import 'server-only'
 
type Dictionaries = {
  [key: string]: () => Promise<any>
}

const dictionaries: Dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  pt: () => import('./locales/pt.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: 'en' | 'pt') => dictionaries[locale]();
