declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_FILESTACK_API: string
    /** When `true` will output sourcemaps
     * @see https://nextjs.org/docs/advanced-features/source-maps
     */
    SOURCE_MAPS?: "true"
  }
}
