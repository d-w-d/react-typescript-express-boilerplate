declare const __BASE_HREF__: string;
declare const __SITE_LONG_TITLE__: string;
declare const __SITE_SHORT_TITLE__: string;

declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.scss' {
  const styles: any;
  export = styles;
}

declare module '*.sass' {
  const styles: any;
  export = styles;
}

declare module '*.less' {
  const styles: any;
  export = styles;
}

declare module '*.html' {
  const htmlText: any;
  export = htmlText;
}

declare module '*.txt' {
  const txtText: any;
  export = txtText;
}

declare module '*.csv';

declare module '*.jpg';

declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.svg';
