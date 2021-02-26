import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from '@app-entities';

@Injectable()
export class AccountsService {

    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    )   { }
}
