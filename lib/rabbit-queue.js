const EventManager =  require('rabbitmq-event-manager');

const eventManagerProducer = new EventManager({
    url: 'amqp://localhost:5672',
    application: 'Producer',
    logLevel: 'debug',
    logPrefix: 'PRODUCER_RECIPES',
  });


  eventManagerProducer.initialize()
  .then( async () => {

      /** Do something after initialization */

      console.log(`-- rabbitmq event manager connect succesfull --`);
      console.log(`-- send message to the exchange --`);

    // await pause(1000);
    // Send some events
    // emitter();
  
  })
  .catch((err)=> {
      /** An error occured while initialization */
      console.error(err);

      const help = `------
            Did you start a RabbitMQ server using that command for example: 
            docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
            Start and try again
            ------`;
           console.error(help);
           process.exit(1);
  });

  const queueProcess = async (payload) =>{
    await eventManagerProducer.emit('PRODUCER_RECIPES.EVENT', { ...payload, action: 'ACK' });
    //await eventManagerProducer.emit('PRODUCER_RECIPES.EVENT', { ...payload, action: 'FLUSH' });
    //await eventManagerProducer.emit('PRODUCER_RECIPES.EVENT', { ...payload, action: 'REQUEUE',});
    await eventManagerProducer.emit('PRODUCER_RECIPES.NO_APP_BOUND', { ...payload });
  };

  module.exports = queueProcess;