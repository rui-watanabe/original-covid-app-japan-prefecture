/// <reference types="react-scripts" />

/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // readonly REACT_APP_NODE_ENV: 'development' | 'production' | 'test';
    readonly REACT_APP_API_HOST: string;
  }
}
