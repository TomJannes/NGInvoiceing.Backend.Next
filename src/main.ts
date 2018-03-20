import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import * as mm from 'mongodb-migrations';

async function bootstrap() {
	var migrator = new mm.Migrator({
		'url': 'mongodb://127.0.0.1:27017/NGInvoicing'
	});
	var migrationPath = path.join(__dirname, 'migrations');
    migrator.runFromDir(migrationPath, function(err, result){
        console.warn(err)
    });

	const app = await NestFactory.create(ApplicationModule);

	const options = new DocumentBuilder()
		.setTitle('NGInvoicing Backend')
		.setDescription('The NGInvoicing Backend API description')
		.setVersion('1.0')
		.addTag('Customers')
		.addTag('CustomerTypes')
		.addTag('Invoices')
		.addTag('InvoiceStates')
		.addTag('Profile')
		.addTag('Skus')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/api', app, document);

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);
}
bootstrap();
