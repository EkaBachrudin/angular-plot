declare module 'htl' {
  export function svg(template: TemplateStringsArray, ...substitutions: any[]): SVGElement;
  export function html(template: TemplateStringsArray, ...substitutions: any[]): HTMLElement;
}