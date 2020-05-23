import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

import IMailTemplateProvider, { IParseMailTemplateDTO } from "../models/IMailTemplateProvider";

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ filename, variables }: IParseMailTemplateDTO): Promise<string> {

    const file = path.resolve(__dirname, '..', 'templates', `${filename}.hbs`)

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })
    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
