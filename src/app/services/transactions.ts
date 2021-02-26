import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';

import { Transactions } from '@app-entities';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(Transactions)
        private transactionRepository: Repository<Transactions>
    )   {   }

    public async getTransactionOfYearAndMonth(year: number, month: number): Promise<any> {
        
        let query = await getRepository(Transactions)
        .createQueryBuilder('trans')
        .leftJoinAndSelect('trans.account', 'acc')
        .leftJoinAndSelect('trans.category', 'cat')
        .where('EXTRACT(YEAR FROM trans.date) = :pYear', { pYear: year });
        if (month)    {
            query.where('EXTRACT(MONTH FROM trans.date) = :pMonth', { pMonth: month });
        }

        let res = query.getMany();
        return res;
    }
}