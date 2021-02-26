import { Controller, Get, Post, Body, HttpException, HttpStatus, Delete, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { AbstractController } from './abstract';
import { Account } from '@app-entities';

@Controller('accounts')
export class AccountController extends AbstractController {

    constructor(
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) {
        super()
    }

    @Get()
    public getAccounts(): Promise<Account[]>    {
        return this.accountRepository.find();
    }

    @Post()
    public async addNewAccount(@Body() account: Account): Promise<Account> {

        if (!account.name)
            throw new HttpException('Name is missing', HttpStatus.PARTIAL_CONTENT);

        await this.accountRepository.save(account).then(res => {
            account = res
        }).catch(err => {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        })

        return account;
    }

    @Delete('/:id')
    public async removeAccount(@Param('id') id: number): Promise<Account> {
        
        let account: Account = await this.accountRepository.findOne(id)

        if (account) {
            let res: DeleteResult = await this.accountRepository.delete(account)
            if(res.affected == 0)    {
                throw new HttpException('{id : ' + id + '} not found.', HttpStatus.NOT_FOUND)
            }
        } else {
            throw new HttpException('{id : ' + id + '} not found.', HttpStatus.NOT_FOUND)
        }
        return account;
    }
}