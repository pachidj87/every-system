import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from 'nest-router';
import { ExpenseCategory } from './expense-category.entity';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategoriesController } from './expense-categories.controller';
import { TenantModule } from '../tenant/tenant.module';
import { CommandHandlers } from './commands/handlers';

@Module({
	imports: [
		RouterModule.forRoutes([
			{ path: '/expense-categories', module: ExpenseCategoriesModule }
		]),
		TypeOrmModule.forFeature([ExpenseCategory]),
		TenantModule
	],
	controllers: [ExpenseCategoriesController],
	providers: [
		ExpenseCategoriesService,
		...CommandHandlers
	],
	exports: [
		TypeOrmModule,
		ExpenseCategoriesService
	]
})
export class ExpenseCategoriesModule {}
