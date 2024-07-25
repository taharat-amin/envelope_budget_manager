export interface transaction {
    amt: number,
    des: string
}

export interface envelope {
    category: string,
    description: string,
    budget: number
}

export class Envelope {

    private _category: string;
    private _description: string;
    private _budget: number;
    private _spending: number;
    private _transactions: transaction[];

    constructor(detail: envelope) {
        this._category = detail.category;
        this._description = detail.description;
        this._budget = detail.budget;
        this._spending = 0;
        this._transactions = [{ amt: detail.budget, des: 'Initial deposit' }];
    }

    public get detail(): { [key: string]: string | number } {
        return { "Category": this._category, "Description": this._description, "Budget": this._budget, "Spent": this._spending };
    }

    public get trxHistory(): transaction[] {
        return this._transactions;
    }

    public addSpending(trx: transaction): boolean {
        if (trx.amt <= this._budget) {
            this._transactions.push(trx);
            this._budget -= trx.amt;
            this._spending += trx.amt;
            return true;
        } return false;
    }

    public increaseBudget(trx: transaction) {
        this._transactions.push(trx);
        this._budget += trx.amt;
    }
}