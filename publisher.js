
const EventManager =  require('rabbitmq-event-manager');

const eventManagerProducer = new EventManager({
    url: 'amqp://localhost:5672',
    application: 'Producer',
    logLevel: 'debug',
    logPrefix: 'PRODUCER',
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


  async function pause(n) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, n);
    });
  };


    /** Send an event every seconds, after 20 seconds, will stop and send stop  */
   // function emitter() {
    
   const payload = {
      user: {
        id: 1,
        firstname: 'ali',
        lastname:'reza',
        isActive: true
      },
    };
    
    eventManagerProducer.emit('PRODUCER.EVENT', { ...payload, action: 'ACK' });
    
    eventManagerProducer.emit('PRODUCER.EVENT', { ...payload, action: 'FLUSH' });
    
    eventManagerProducer.emit('PRODUCER.EVENT', { ...payload, action: 'REQUEUE',});
  
    eventManagerProducer.emit('PRODUCER.NO_APP_BOUND', { ...payload });

  //};

  
  async function closeAll() {
    await eventManagerProducer.close();
    console.log('You should have 2 messages in the DEAD_LETTER_QUEUE');
    console.log('You should have 1 messages in the QUEUE_NO_QUEUE');
    process.exit(0);
  }
  
  
  setTimeout(async () => {
    await closeAll();
  }, 5000);