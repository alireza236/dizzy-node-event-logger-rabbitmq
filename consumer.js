const EventManager =  require('rabbitmq-event-manager');

const db = require("./database");


db.then(() => {
  console.log('Connected correctly to server database.')
});

const eventManagerConsumer = new EventManager({
    url: 'amqp://localhost:5672',
    application: 'Consumer',
    logLevel: 'debug',
    logPrefix: 'CONSUMER',
  });


  eventManagerConsumer.initialize()
  .then( async ()=>{
      /** Do something after initialization */
      console.log(`-- consumer is ready --`);

      // Initialize consumer
    consumer();
    
    await pause(1000);
    
    // Send some events
    //emitter();
  
  })
  .catch((err)=> {
      /** An error occured while initialization */
      console.error(err);

      const help = `
      ------
      Did you start a RabbitMQ server using that command for example: 
          docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
      Start and try again
      ------
      `;
          console.error(help);
          process.exit(1);
  });


  async function pause(n) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, n);
    });
  };


  function consumer() {
    eventManagerConsumer.on('PRODUCER_RECIPES.EVENT', async (payload) => {
      console.log('-- message received --', payload);
      
      const collection = await db.get('recipes');
      
      switch (payload.action) {
        case 'FLUSH':
          throw new Error('Flush Message');
        case 'REQUEUE':
          return false;
        case 'ACK':
          try {
            let recipes =  await collection.insert({
               userId : payload.userId, 
               recipe_name: payload.recipe_name,
               customer_name: payload.customer_name,
               count: payload.count,
               price: payload.price,
               createdAt: new Date()
             });
                        
             console.log('RECIPES', JSON.stringify(recipes, null,2));
           } catch (error) {
             console.error(error);
           }
          return true
        default:
          return true;
        }

      }); 
    
  };
  
  
/*  
    async function closeAll() {
    await eventManagerConsumer.close();
    console.log('You should have 2 messages in the DEAD_LETTER_QUEUE');
    console.log('You should have 1 messages in the QUEUE_NO_QUEUE');
    process.exit(0);
  }
  
  
  setTimeout(async () => {
    await closeAll();
  }, 5000); 
*/