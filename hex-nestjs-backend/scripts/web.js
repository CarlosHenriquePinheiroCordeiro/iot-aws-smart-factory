#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Uso: yarn src <moduleName> <portName> [métodos...]');
  process.exit(1);
}

const firstCharUppercase = (word) => word.charAt(0).toUpperCase() + word.slice(1);

/** GENERATING CONTROLLER METHODS */

const generateController = (adaptersInPortDir, name, methods) => {
  const controllerFile = path.join(adaptersInPortDir, `${moduleName}.controller.ts`);
  const imports = getImports(methods);
  const structure = getIniStructure(name, methods)
  const meths = getMethods(methods)
  let content = [imports.join('\n'), structure.join('\n'), meths.join('\n'), '\n}'];
  fs.writeFileSync(controllerFile, content.join('\n\n'));
}

const getImports = (methods) => {
  const imports = ["import { Controller } from '@nestjs/common/decorators/core';", "import { Response } from 'express';"];
  const decorators = ['Res']
  if (isCrud) {
    decorators.push('Body')
    decorators.push('Delete')
    decorators.push('Patch')
    decorators.push('Post')
    decorators.push('Get')
    imports.push("import { IHttpResponse } from '../../../../interfaces/http-response.interface';")
    imports.push("import { CreateDto } from '../../../dto/create.dto';")
    imports.push("import { UpdateDto } from '../../../dto/update.dto';")
    imports.push("import { DeleteDto } from '../../../dto/delete.dto';")
  }
  imports.push(`import { ${decorators.join(', ')} } from '@nestjs/common/decorators/http';`)
  methods.forEach(method => {
      const name = firstCharUppercase(method);
      imports.push(`import { ${name}UseCase } from '../../../application/ports/in/${method}.use-case';`);
  })
  return imports;
}

const getIniStructure = (name, methods) => {
  const cName = firstCharUppercase(name)
  const structure = [`@Controller('${name}')`, `export class ${cName}Controller {`];

  if (methods.length > 0) {
      structure.push('  constructor(')
      methods.forEach(method => {
          const upperName = firstCharUppercase(method)
          structure.push(`    private readonly ${method}UseCase: ${upperName}UseCase,`)
      })
      structure.push('  ) {}')
  }
  return structure
}

const getMethods = (methods) => {
  const meths = [];
  for (const method of methods) {
    if (!Object.keys(crudMethods).includes(method)) {
      meths.push(`  async ${method}(@Res() response: Response) {}\n`)
      continue
    }
    meths.push(crudMethods[method])
  };
  return meths;
}

const crudMethods = ({
  find : `  @Get('/find')
  async find(@Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findUseCase.find()) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`,

  findById : `  @Get('/find/:id')
  async findById( @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findByIdUseCase.findById()) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`,

  create : `  @Post('/create')
  async create(@Body() createDto: CreateDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.createUseCase.create(
        createDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`,

  update : `  @Patch('/update')
  async update(@Body() updateDto: UpdateDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.updateUseCase.update(
        updateDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`,

  delete : `  @Delete('/delete')
  async delete(@Body() deleteDto: DeleteDto, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.deleteUseCase.delete(
        deleteDto,
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`
})

const useDto = (meth) => ['create', 'update', 'delete'].indexOf(meth) > -1;

/* GENERATING ADAPTERS METHODS */

const generateAdapters = (adaptersOutDir, methods) => {
  methods.forEach(method => {
    const adapterFile = path.join(adaptersOutDir, `${method}.adapter.ts`);
    fs.writeFileSync(adapterFile, getStandardAdapter(method));
  })

  //GENERATING INDEX
  const indexFile = path.join(adaptersOutDir, 'index.ts');
  fs.writeFileSync(indexFile, getAdapterIndexContent(methods).join('\n'));
}

const getStandardAdapter = (name) => {
  const cName = firstCharUppercase(name)
  const fileContent = ["import { Injectable } from '@nestjs/common/decorators/core';"]
  const dto = useDto(name)
  if (dto) fileContent.push(`import { ${cName}Dto } from '../../dto/${name}.dto';`)
  fileContent.push(`import { ${cName}Port } from '../../application/ports/out/${name}.port';\n`)
  fileContent.push('@Injectable()')
  fileContent.push(`export class ${cName}Adapter extends ${cName}Port {\n`)
  fileContent.push(`  async ${name}(${dto ? `${name}Dto: ${cName}Dto` : ''}): Promise<any> {/* LOGIC */}\n\n`)
  fileContent.push('}')
  return fileContent.join('\n')
}

const getAdapterIndexContent = (methods) => {
  const content = ["import { Provider } from '@nestjs/common/interfaces/modules';"];
  methods.forEach(method => {
    const cName = firstCharUppercase(method)
    content.push(`import { ${cName}Port } from '../../application/ports/out/${method}.port';`)
    content.push(`import { ${cName}Adapter } from './${method}.adapter';`)
  });

  content.push(`\nexport const ServicesOut: Provider[] = [`)
  methods.forEach(method => {
    const cName = firstCharUppercase(method)
    content.push(
    ` {
    provide: ${cName}Port,
    useClass: ${cName}Adapter,
  },`)
  })
  content.push(']')
  return content
}

const getStandardAdapterModuleContent = (name) => {
  const cName = firstCharUppercase(name);
  return (
    `import { forwardRef } from '@nestjs/common';
import { ServicesOut } from './out';
import { Module } from '@nestjs/common/decorators/modules';
import { ${cName}Controller } from './in/web/${name}.controller';
import { ${cName}ApplicationModule } from '../application/application.module';

@Module({
  imports: [
    forwardRef(() => ${cName}ApplicationModule),
  ],
  providers: [...ServicesOut],
  exports: [...ServicesOut],
  controllers: [${cName}Controller],
})
export class ${cName}AdapterModule {}`
  )
}

const generateAdapterModule = (adaptersDir, moduleName) => {
  const adapterModuleFile = path.join(adaptersDir, 'adapter.module.ts');
  fs.writeFileSync(adapterModuleFile, getStandardAdapterModuleContent(moduleName));
}

const generateAdaptersFolder = (moduleDir, moduleName, methods) => {
  //ADAPTERS/IN (CONTROLLER)
  const adaptersInPortDir = path.join(moduleDir, 'adapters', 'in', portName);
  fs.mkdirSync(adaptersInPortDir, { recursive: true });
  generateController(adaptersInPortDir, moduleName, methods);

  //ADAPTERS/OUT
  const adaptersOutDir = path.join(moduleDir, 'adapters', 'out');
  fs.mkdirSync(adaptersOutDir, { recursive: true });
  generateAdapters(adaptersOutDir, methods)

  //ADAPTER.MODULE.TS
  const adaptersDir = path.join(moduleDir, 'adapters');
  fs.mkdirSync(adaptersDir, { recursive: true });
  generateAdapterModule(adaptersDir, moduleName);
}

/* GENERATING USE CASES METHODS */
const getStandardUseCaseFileContent = (method) => {
  const cName = firstCharUppercase(method)
  const dto = useDto(method)
  const content = []
  if (dto) content.push(`import { ${cName}Dto } from "../../../dto/${method}.dto"\n`)

  content.push(
    `export abstract class ${cName}UseCase {
  abstract ${method}(${dto ? `${method}Dto: ${cName}Dto` : ``}): any;
}`)
  return content;
}

const generateUseCases = (moduleDir, methods) => {
  const applicationPortsInDir = path.join(moduleDir, 'application', 'ports', 'in');
  fs.mkdirSync(applicationPortsInDir, { recursive: true });

  methods.forEach(method => {
    const useCaseFile = path.join(applicationPortsInDir, `${method}.use-case.ts`);
    fs.writeFileSync(useCaseFile, getStandardUseCaseFileContent(method).join('\n'));
  })
}


/* GENERATING OUT PORTS METHODS */

const getStandardOutPortFileContend = (method) => {
  const cName = firstCharUppercase(method)
  const content = [];
  const dto = useDto(method)
  if (dto) content.push(`import { ${cName}Dto } from '../../../dto/${method}.dto';\n`)

  content.push(
    `export abstract class ${cName}Port {
  abstract ${method}(${dto ? `${method}Dto: ${cName}Dto` : ``}): any;
}`)
  return content;
}

const generateOutPorts = (moduleDir, methods) => {
  const applicationPortsDir = path.join(moduleDir, 'application', 'ports', 'out');
  fs.mkdirSync(applicationPortsDir, { recursive: true });
  methods.forEach(method => {
    const portFile = path.join(applicationPortsDir, `${method}.port.ts`);
    fs.writeFileSync(portFile, getStandardOutPortFileContend(method).join('\n'));
  })
}

/* GENERATING SERVICES METHODS */
const getStandardServiceFileContent = (method) => {
  const cName = firstCharUppercase(method)
  const dto = useDto(method)
  return `import { Injectable } from '@nestjs/common/decorators/core';
import { ${cName}UseCase } from '../ports/in/${method}.use-case';
import { ${cName}Port } from '../ports/out/${method}.port';
${dto ? `import { ${cName}Dto } from '../../dto/${method}.dto';` : ``}

@Injectable()
export class ${cName}Service implements ${cName}UseCase {
  constructor(private ${method}Port: ${cName}Port) {}

  ${method}(${dto ? `${method}Dto: ${cName}Dto` : ``}): any {
    return this.${method}Port.${method}(${dto ? `${method}Dto` : ''});
  }
}`;
}

const getOutPortIndexContent = (methods) => {
  const content = ["import { Provider } from '@nestjs/common';"];
  methods.forEach(method => {
    const cName = firstCharUppercase(method)
    content.push(`import { ${cName}UseCase } from '../ports/in/${method}.use-case';`)
    content.push(`import { ${cName}Service } from './${method}.service';`)
  });

  content.push(`\nexport const Services: Provider[] = [`)
  methods.forEach(method => {
    const cName = firstCharUppercase(method)
    content.push(
    ` {
    provide: ${cName}UseCase,
    useClass: ${cName}Service,
  },`)
  })
  content.push(']')
  return content
}

const generateServices = (moduleDir, methods) => {
  const applicationServicesDir = path.join(moduleDir, 'application', 'services');
  fs.mkdirSync(applicationServicesDir, { recursive: true });
  methods.forEach(method => {
    const serviceFile = path.join(applicationServicesDir, `${method}.service.ts`);
    fs.writeFileSync(serviceFile, getStandardServiceFileContent(method));
  })

  const indexFile = path.join(applicationServicesDir, 'index.ts');
  fs.writeFileSync(indexFile, getOutPortIndexContent(methods).join('\n'));

}

const getStandardApplicationModuleFileContent = (module) => {
  const cName = firstCharUppercase(module)
  return (
    `import { forwardRef } from '@nestjs/common';
import { Services } from './services';
import { ${cName}AdapterModule } from '../adapters/adapter.module';
import { Module } from '@nestjs/common/decorators/modules';

@Module({
  imports: [forwardRef(() => ${cName}AdapterModule)],
  providers: [...Services],
  exports: [...Services],
})
export class ${cName}ApplicationModule {}
`)
}

const generateApplicationModule = (applicationDir, moduleName) => {
  const applicationModuleFile = path.join(applicationDir, 'application.module.ts');
  fs.writeFileSync(applicationModuleFile, getStandardApplicationModuleFileContent(moduleName));
}

/* APPLICATION FOLDER GENERATION */
const generateApplicationFolder = (moduleDir, moduleName, methods) => {
  const applicationDir = path.join(moduleDir, 'application');
  fs.mkdirSync(applicationDir, { recursive: true });
  generateUseCases(moduleDir, methods)
  generateOutPorts(moduleDir, methods)
  generateServices(moduleDir, methods)
  generateApplicationModule(applicationDir, moduleName)
}

const getStandarModuleFileContent = (moduleName) => {
  const name = firstCharUppercase(moduleName)
  return (
    `import { Module } from '@nestjs/common/decorators/modules';
import { ${name}ApplicationModule } from './application/application.module';
import { ${name}AdapterModule } from './adapters/adapter.module';

@Module({
  imports: [
    ${name}ApplicationModule,
    ${name}AdapterModule,
  ],
})
export class ${name}Module {}`)
}

const generateModule = (moduleName) => {
  const moduleFile = path.join(moduleDir, `${moduleName}.module.ts`);
  fs.writeFileSync(moduleFile, getStandarModuleFileContent(moduleName));
}

const generateDtos = (moduleDir, methods) => {
  if (isCrud) {
    const dtoDir = path.join(moduleDir, 'dto');
    fs.mkdirSync(dtoDir, { recursive: true });
    methods.forEach(method => {
      if (useDto(method)) {
        const dtoFile = path.join(dtoDir, `${method}.dto.ts`);
        const cName = firstCharUppercase(method)
        fs.writeFileSync(dtoFile, `export class ${cName}Dto {}`);
      }
    })
  }
}

/* GENERATING FILE */
const portName = 'web';
const moduleName = args[0];
let methods = args.slice(1);
var isCrud = false;

if (methods.includes('crud')) {
  methods = methods.filter(method => method !== 'crud')
  methods = methods.concat(Object.keys(crudMethods))
  isCrud = true;
} 

let baseDir = path.join(__dirname, 'src');
baseDir = baseDir.replace('/scripts', '')
const moduleDir = path.join(baseDir, moduleName);
fs.mkdirSync(moduleDir, { recursive: true });

generateModule(moduleName);
generateAdaptersFolder(moduleDir, moduleName, methods);
generateApplicationFolder(moduleDir, moduleName, methods)
generateDtos(moduleDir, methods)


console.log(`Estrutura do módulo ${moduleName} gerada com sucesso!`);

