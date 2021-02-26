import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AbstractController } from './abstract';
import { Transactions } from '@app-entities';
import { TransactionsService } from '@app-services';

@Controller('transactions')
export class TransactionsController extends AbstractController {

    constructor(
        @InjectRepository(Transactions)
        private transactionRepository: Repository<Transactions>,
        private transactionService: TransactionsService
    ) {
        super()
    }

    @Get()
    public transactionsList(): Promise<Transactions[]> {
        return this.transactionRepository.find({
            relations: ['category', 'account']
        });
    }

    @Post()
    public async addNewTransaction(@Body() trans: Transactions): Promise<Transactions> {

        console.log(trans)
        if (!trans)
            throw new HttpException('Data is missing', HttpStatus.PARTIAL_CONTENT)

        let transaction: Transactions = null;
        await this.transactionRepository.save(trans)
        .then(res => {
            transaction = res
        }).catch(err => {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
        })

        return transaction;
    }

    @Get('/:year/:month?')
    public async getList(@Param() params): Promise<any>    {

        let res = await this.transactionService
            .getTransactionOfYearAndMonth(params.year, params.month);
        return res;
    }
}