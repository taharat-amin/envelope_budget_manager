import express, { Request, Response, Router, NextFunction } from "express";
import { Envelope, transaction, envelope } from "./envelope";

const port = 3000;
const app = express()
const envelopeRoute = Router()
const envelopeData: { [key: string]: Envelope } = {};

function checkReq(req: Request, res: Response, next: NextFunction) {
    console.log(req.method, req.body);
    next();
}

function isValidEnvelope(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (data && typeof data.category === 'string' && typeof data.description === 'string' && typeof data.budget == 'number') {
        next()
    } else {
        res.status(400).send('Invalid data body')
    }
}

function isValidTransaction(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    if (data && typeof data.amt === 'number' && typeof data.des === 'string') {
        next()
    } else {
        res.status(400).send('Invalid data body')
    }
}

app.use(express.json())
app.use(checkReq);
app.use('/envelope', envelopeRoute)

// The landing endpoint
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the server!');
})

// Endpoint to create new Envelope object
envelopeRoute.post('/create', isValidEnvelope, (req: Request, res: Response) => {
    const data: envelope = req.body;
    envelopeData[data.category] = new Envelope(data)
    res.status(201).send(`Envelope ${data.category} created successfully`);
})

envelopeRoute.get('/list', (req: Request, res: Response)=>{
    res.status(200).json(envelopeData);
})

// Endpoint to view the detail of a particular envelope
envelopeRoute.get('/detail', (req: Request, res: Response) => {

    const envelopeCategory: string = req.query.envelope as string;

    if (envelopeCategory && envelopeData[envelopeCategory]) {
        res.status(200).json(envelopeData[envelopeCategory].detail)
    } else if (!envelopeCategory) {
        res.status(400).send('Invalid query');
    } else {
        res.status(404).send('Requested envelope not found');
    }
})

// Endpoint to view the transaction history of a particular envelope
envelopeRoute.get('/trxhistory', (req: Request, res: Response) => {

    const envelopeCategory: string = req.query.envelope as string;

    if (envelopeCategory && envelopeData[envelopeCategory]) {
        res.status(200).json(envelopeData[envelopeCategory].trxHistory)
    } else if (!envelopeCategory) {
        res.status(400).send('Invalid query');
    } else {
        res.status(404).send('Requested envelope not found');
    }
})

// Endpoint to add a spending transactions to a particular envelope
envelopeRoute.put('/spend', isValidTransaction, (req: Request, res: Response) => {
    const trx: transaction = req.body;
    const envelopeCategory: string = req.query.envelope as string;
    if (envelopeData[envelopeCategory].addSpending(trx)) {
        res.status(201).send('Recorded spending transaction');
    } else {
        res.status(400).send('Insufficient budget')
    }
})

// Endpoint to add budget to a particular envelope
envelopeRoute.put('/addbudget', isValidTransaction, (req: Request, res: Response) => {
    const trx: transaction = req.body;
    const envelopeCategory: string = req.query.envelope as string;
    envelopeData[envelopeCategory].increaseBudget(trx)
    res.status(201).send('Increased budget');
})

app.listen(port, () => {
    console.log('App listening on port 3000');
})