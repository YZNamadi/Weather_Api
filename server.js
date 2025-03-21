// const express = require('express');
require('./config/database');
// // const transactionRouter = require('./routes/transactionRouter');

// const PORT = 7496;
// const app = express();

// app.use(express.json());
// // app.use('/api/v1/', transactionRouter);

// app.get('/', (req, res) => {
//     res.send('API is running...');
// });
// app.listen(PORT, ()=>{
//     console.log(`Server is listening to PORT ${PORT}`)
// })

 
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const weatherRoutes = require('./routes/weatherRoute');
app.use('/weather', weatherRoutes);

app.use(( req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

