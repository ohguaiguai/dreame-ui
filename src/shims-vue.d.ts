declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

interface Global {
  document: Document;
  window: Window;
}
