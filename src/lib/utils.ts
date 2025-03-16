import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReadonlyURLSearchParams } from 'next/navigation';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}



export const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000/shop/';

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  // En développement avec des données mockées, nous n'avons pas besoin de valider les variables d'environnement
  // Cette fonction est donc simplifiée pour éviter les erreurs
  if (process.env.NODE_ENV === 'production') {
    const requiredEnvironmentVariables = [
      'SHOPIFY_STORE_DOMAIN',
      'SHOPIFY_STOREFRONT_ACCESS_TOKEN'
    ];
    const missingEnvironmentVariables = [] as string[];

    requiredEnvironmentVariables.forEach((envVar) => {
      if (!process.env[envVar]) {
        missingEnvironmentVariables.push(envVar);
      }
    });

    if (missingEnvironmentVariables.length) {
      console.warn(
        `Les variables d'environnement suivantes sont manquantes : ${missingEnvironmentVariables.join(
          ', '
        )}`
      );
    }
  }
};