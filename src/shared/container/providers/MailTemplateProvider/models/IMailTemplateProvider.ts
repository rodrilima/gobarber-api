export interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplateDTO {
  filename: string;
  variables: ITemplateVariables;
}

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
