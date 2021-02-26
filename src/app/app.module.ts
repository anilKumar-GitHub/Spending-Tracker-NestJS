import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account, Category, Transactions } from '@app-entities';
import { AccountsService, CategoriesService, TransactionsService } from '@app-services';
import {
  AccountController, CategoriesController, TransactionsController 
} from '@app-controllers';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      Account,
      Category,
      Transactions
    ])
  ],
  controllers: [
    AccountController,
    CategoriesController,
    TransactionsController
  ],
  providers: [
    AccountsService,
    CategoriesService,
    TransactionsService
  ]
})
export class AppModule {  }