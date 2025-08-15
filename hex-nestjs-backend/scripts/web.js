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
  const imports = getImports(methods, firstCharUppercase(name));
  const structure = getIniStructure(name, methods)
  const meths = getMethods(methods, name)
  let content = [imports.join('\n'), structure.join('\n'), meths.join('\n'), '\n}'];
  fs.writeFileSync(controllerFile, content.join('\n\n'));
}

const getImports = (methods, name) => {
  const imports = ["import { Controller } from '@nestjs/common/decorators/core';", "import { Response } from 'express';"];
  const decorators = ['Res']
  if (isCrud) {
    decorators.push('Body')
    decorators.push('Delete')
    decorators.push('Patch')
    decorators.push('Post')
    decorators.push('Get')
    imports.push("import { IHttpResponse } from '../../../../interfaces/http-response.interface';")
    imports.push("import { DtoToDomainPipe } from '../../../../pipes/dtoToDomain.pipe';")
    imports.push("import { CreateDto } from '../../../dto/create.dto';")
    imports.push("import { UpdateDto } from '../../../dto/update.dto';")
    imports.push("import { DeleteDto } from '../../../dto/delete.dto';")
    imports.push(`import { ${name} } from '../../../${name}';`)
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

const getMethods = (methods, name) => {
  const meths = [];
  for (const method of methods) {
    if (!Object.keys(getCrudMethods(name)).includes(method)) {
      meths.push(`  async ${method}(@Res() response: Response) {}\n`)
      continue
    }
    meths.push(getCrudMethods(name)[method])
  };
  return meths;
}

const getCrudMethods = (domainName) => {
  const cName = firstCharUppercase(domainName);
  return {
    find : `  @Get()
  async find(@Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findUseCase.find()) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`,
  
    findById : `  @Get('/:id')
  async findById( @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.findByIdUseCase.findById()) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`,
  
    create : `  @Post()
  async create(@Body(new DtoToDomainPipe(CreateDto, ${cName})) ${domainName}: ${cName}, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.createUseCase.create(
        ${domainName},
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`,
  
    update : `  @Patch()
  async update(@Body(new DtoToDomainPipe(UpdateDto, ${cName})) ${domainName}: ${cName}, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.updateUseCase.update(
        ${domainName},
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`,
  
    delete : `  @Delete()
  async delete(@Body(new DtoToDomainPipe(DeleteDto, ${cName})) ${domainName}: ${cName}, @Res() response: Response) {
    const resp: Partial<IHttpResponse> = (await this.deleteUseCase.delete(
        ${domainName},
    )) as Partial<IHttpResponse>;
    return response.status(resp.statusCode!).json(resp);
  }\n`
  };
}

/* GENERATING ADAPTERS METHODS */

const generateAdapters = (adaptersOutDir, methods, moduleName) => {
  methods.forEach(method => {
    const adapterFile = path.join(adaptersOutDir, `${method}.adapter.ts`);
    fs.writeFileSync(adapterFile, getStandardAdapter(method, moduleName));
  })

  //GENERATING INDEX
  const indexFile = path.join(adaptersOutDir, 'index.ts');
  fs.writeFileSync(indexFile, getAdapterIndexContent(methods).join('\n'));
}

const getStandardAdapter = (method, moduleName) => {
  const cName = firstCharUppercase(moduleName)
  const cMethod = firstCharUppercase(method)
  const fileContent = ["import { Injectable } from '@nestjs/common/decorators/core';"]
  if (isCrud) {
    fileContent.push(`import { ${cName}Repository } from '../../repository/${moduleName}.repository';`)
    fileContent.push(`import { ${cName} } from '../../${cName}'`)
  }
  fileContent.push(`import { ${cMethod}Port } from '../../application/ports/out/${method}.port';\n`)
  fileContent.push('@Injectable()')
  fileContent.push(`export class ${cMethod}Adapter extends ${cMethod}Port {\n`)
  if (isCrud) fileContent.push(`  constructor(private readonly ${moduleName}Repository: ${cName}Repository) { super() }\n\n`)
  fileContent.push(`  async ${method}(${isCrud ? `${moduleName}: ${cName}` : ''}): Promise<any> {/* LOGIC */}\n\n`)
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
import { ${cName}Provider } from '../repository/provider';

@Module({
  imports: [
    forwardRef(() => ${cName}ApplicationModule),
  ],
  providers: [...ServicesOut, ...${cName}Provider],
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
  generateAdapters(adaptersOutDir, methods, moduleName)

  //ADAPTER.MODULE.TS
  const adaptersDir = path.join(moduleDir, 'adapters');
  fs.mkdirSync(adaptersDir, { recursive: true });
  generateAdapterModule(adaptersDir, moduleName);
}

/* GENERATING USE CASES METHODS */
const getStandardUseCaseFileContent = (method, name) => {
  const cMethod = firstCharUppercase(method)
  const cName = firstCharUppercase(name)
  const content = []
  if (isCrud) content.push(`import { ${cName} } from "../../../${cName}";\n`)

  content.push(
    `export abstract class ${cMethod}UseCase {
  abstract ${method}(${isCrud ? `${name}: ${cName}` : ``}): any;
}`)
  return content;
}

const generateUseCases = (moduleDir, methods, moduleName) => {
  const applicationPortsInDir = path.join(moduleDir, 'application', 'ports', 'in');
  fs.mkdirSync(applicationPortsInDir, { recursive: true });

  methods.forEach(method => {
    const useCaseFile = path.join(applicationPortsInDir, `${method}.use-case.ts`);
    fs.writeFileSync(useCaseFile, getStandardUseCaseFileContent(method, moduleName).join('\n'));
  })
}


/* GENERATING OUT PORTS METHODS */

const getStandardOutPortFileContend = (method, moduleName) => {
  const cMethod = firstCharUppercase(method)
  const cName = firstCharUppercase(moduleName)
  const content = [];
  if (isCrud) content.push(`import { ${cName} } from '../../../${cName}';\n`)

  content.push(
    `export abstract class ${cMethod}Port {
  abstract ${method}(${isCrud ? `${moduleName}: ${cName}` : ``}): any;
}`)
  return content;
}

const generateOutPorts = (moduleDir, methods, moduleName) => {
  const applicationPortsDir = path.join(moduleDir, 'application', 'ports', 'out');
  fs.mkdirSync(applicationPortsDir, { recursive: true });
  methods.forEach(method => {
    const portFile = path.join(applicationPortsDir, `${method}.port.ts`);
    fs.writeFileSync(portFile, getStandardOutPortFileContend(method, moduleName).join('\n'));
  })
}

/* GENERATING SERVICES METHODS */
const getStandardServiceFileContent = (method, moduleName) => {
  const cMethod = firstCharUppercase(method)
  const cName = firstCharUppercase(moduleName)
  return `import { Injectable } from '@nestjs/common/decorators/core';
import { ${cMethod}UseCase } from '../ports/in/${method}.use-case';
import { ${cMethod}Port } from '../ports/out/${method}.port';
${isCrud ? `import { ${cName} } from '../../${cName}';` : ``}

@Injectable()
export class ${cMethod}Service implements ${cMethod}UseCase {
  constructor(private ${method}Port: ${cMethod}Port) {}

  ${method}(${isCrud ? `${moduleName}: ${cName}` : ``}): any {
    return this.${method}Port.${method}(${isCrud ? `${moduleName}` : ''});
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

const generateServices = (moduleDir, methods, moduleName) => {
  const applicationServicesDir = path.join(moduleDir, 'application', 'services');
  fs.mkdirSync(applicationServicesDir, { recursive: true });
  methods.forEach(method => {
    const serviceFile = path.join(applicationServicesDir, `${method}.service.ts`);
    fs.writeFileSync(serviceFile, getStandardServiceFileContent(method, moduleName));
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
  generateUseCases(moduleDir, methods, moduleName)
  generateOutPorts(moduleDir, methods, moduleName)
  generateServices(moduleDir, methods, moduleName)
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
      if (isCrud) {
        const dtoFile = path.join(dtoDir, `${method}.dto.ts`);
        const cName = firstCharUppercase(method)
        fs.writeFileSync(dtoFile, (
          `import { IDto } from "../../interfaces/dto.interface";\n
          export class ${cName}Dto implements IDto {}`
        ));
      }
    })
  }
}

/* GENERATE ENTITY */
const generateEntity = (baseDir, moduleName) => {
  const dir = path.join(baseDir, 'db', 'entities', `${moduleName}.entity.ts`)
  fs.writeFileSync(dir, (
    `import { Entity } from 'typeorm';

@Entity({ name: '${moduleName}s' })
export class ${firstCharUppercase(moduleName)}Entity {`
  ))
}

/* GENERATING DOMAIN CLASS */
const generateDomain = (moduleDir, name) => {
  const dir = path.join(moduleDir, `${firstCharUppercase(name)}.ts`)
  fs.writeFileSync(dir, (
    `import { IDomain } from "../interfaces/domain.interface";

export class ${firstCharUppercase(name)} implements IDomain {}`
  ));
}

/* GENERATING REPOSITORY */
const generateRepository = (moduleDir, moduleName) => {
  //GENERATE FOLDER
  const dir = path.join(moduleDir, 'repository')
  fs.mkdirSync(dir, { recursive: true });
  
  //GENERATE REPOSITORY FILE
  const cName = firstCharUppercase(moduleName)
  fs.writeFileSync(`${dir}/${moduleName}s.repository.ts`, (
    `import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${cName} } from '../${cName}';
import { ${cName}Entity } from '../../db/entities/${moduleName}.entity';
import { IRepository } from '../../interfaces/repository.interface';
import { Mapper } from '../../db/mappers/mapper';

@Injectable()
export class ${cName}Repository implements IRepository {

    constructor(
        @InjectRepository(${cName}Entity)
        private readonly ${moduleName}Repository: Repository<${cName}Entity>,
    ) {}

    async findById(id: string): Promise<${cName} | null> {
        const ${moduleName}Entity = await this.${moduleName}Repository.findOneBy({ id });
        if (!${moduleName}Entity) return null;
        return Mapper.entityToDomain(${cName}, ${moduleName}Entity) as ${cName};
    }

    async save(${moduleName}: ${cName}): Promise<any> {
        const ${moduleName}Entity = Mapper.domainToEntity(${cName}Entity, ${moduleName});
        return await this.${moduleName}Repository.save(${moduleName}Entity);
    }

    
}`))
  
  //GENERATE PROVIDER
  fs.writeFileSync(`${dir}/provider.ts`, (
    `import { Provider } from '@nestjs/common/interfaces/modules';
import { ${cName}Repository } from './${moduleName}s.repository';
import { ${cName}Entity } from '../../db/entities/${moduleName}.entity';

export const ${cName}sProvider: Provider[] = [
    ${cName}Repository,
    {
        provide: "${cName}EntityRepository",
        useClass: ${cName}Entity,
    }
]`));
}

const generateMapper = (moduleDir, moduleName) => {

}

/* GENERATING FILE */
const portName = 'web';
const moduleName = args[0];
let methods = args.slice(1);
var isCrud = false;

if (methods.includes('crud')) {
  methods = methods.filter(method => method !== 'crud')
  methods = methods.concat(Object.keys(getCrudMethods(moduleName)))
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
if (isCrud) {
  generateEntity(baseDir, moduleName)
  generateDomain(moduleDir, moduleName)
  generateRepository(moduleDir, moduleName)
}


console.log(`Estrutura do módulo ${moduleName} gerada com sucesso!`);

