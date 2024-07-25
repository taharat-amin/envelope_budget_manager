# Envelope Budget Manager

<a href="https://en.wikipedia.org/wiki/Envelope_system">Envelope budgeting</a> is a popular method to manage personal finances by creating labeled envelopes conatining cash for different purposes such as groceries, vacations, clothing etc. In a digital era, we no longer hold cash and carry out most of our transactions through digital channels. Therefore this classical budgeting method should also become digitalized, right?

## Dependencies
To run the project install the below dependencies
```sh
npm install typescript express @types/express
```

## Data Structures
The data in this project is stored in objects called **Envelopes** which have the following properties:
+ `category` is a string containing the label of the envelope.
+ `description` is a string containing the description of the envelope.
+ `budget` a number which shows the remaining budget.
+ `spending` a number which shows the total spending.
+ `transactions` is a list containing the transactions that took place.

The Envelope object incorporates two interfaces namely `transaction` and `envelope`. As the name suggests, these interfaces define the structure of a transaction and an envelope respectively.

## API Description
This project contains API endpoints to manage envelopes, which are:
1. `GET /` is the landing endpoint.
2. `POST /envelope/create` is used to create new Envelope object and store it in the map called `envelopeData`. The request body should resemble the `envelope` interface.
3. `GET /envelope/list` lists all the envelopes in the `envelopeData` map.
4. `GET /envelope/detail/?envelope=` sends the detail of the specified envelope.
5. `GET /envelope/trxhistory/?envelope=` sends the transaction history of the specified envelope.
6. `PUT /envelope/spend/?envelope=` is the endpoint that records a spending from the specified envelope. The request body should resemble the `transaction` interface.
7. `PUT /envelope/addbudget/?envelope=` adds more budget to the specified envelope. The request body should resemble the `transaction` interface.