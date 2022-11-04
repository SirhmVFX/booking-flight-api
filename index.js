const express = require('express'); 
const app = express();

app.use(express.json())
const availableTickets = [
    {
        id: 1, 
        title: "flight to canada", 
        time: "1pm",
        price: "26000",
        date: "26-06-2022",
    },  
        {
        id: 2, 
        title: "flight to tokyo", 
        time: "2pm",
        price: "27000",
        date: "27-07-2022"
    }
    
]

const homeDir = function(req, res){
    res.send('Welcome to Sirhm Flight Booking API');
}

const allTickets = function(req, res){
    res.send(availableTickets);
}

const getTicket = function(req, res){
    const aTicket = availableTickets.find(aTicket => aTicket.id === parseInt(req.params.id))
    if (!aTicket) res.status(404).send('Sorry!!! TIcket is unavailable');
    res.send(aTicket);
}

const addTicket = function(req, res){
    if (!req.body.name || req.body.name.lenght < 3){
        res.status(400).send('Name is required and should be minimum of 3 characters');
    }

    const newTicket = {
        id: allTickets.length + 1, 
        title: req.body.title,
        time: req.body.time, 
        price: req.body.price, 
        date: req.body.price,
    }

    availableTickets.push(newTicket)
    res.send(newTicket)
}

const updateTicket = function(req, res){
    const aTicket = availableTickets.find(aTicket => aTicket.id === parseInt(req.params.id))
    if (!aTicket) res.status(404).send('Sorry!!! TIcket is unavailable');

    aTicket.title = req.body.title;
    aTicket.time = req.body.time;
    aTicket.price = req.body.price;
    aTicket.date = req.body.date;

    res.send(aTicket);
}

const deleteTicket = function(req, res){
    const aTicket = availableTickets.find(aTicket => aTicket.id === parseInt(req.params.id))
    if (!aTicket) res.status(404).send('Sorry!!! TIcket is unavailable');

    const index = availableTickets.indexOf(aTicket);
    availableTickets.splice(index, 1);

    res.send(aTicket)
}

app.get('/', homeDir);

app.get('/api/tickets', allTickets);

app.get('/api/tickets/:id', getTicket);

app.post('/api/tickets', addTicket);

app.put('/api/tickets/:id', updateTicket);

app.delete('/api/tickets/:id', deleteTicket);

const port = process.env.PORT || 8080; 

app.listen(port, function(){
    console.log(`Server is listening and connected to port ${port}.....`);
})