/// <reference types="vite/client" />

declare module '*.glsl' {
  const value: string;
  export default value;
}

declare module "*names.json" {
  const value: string[];
  export default value;
}