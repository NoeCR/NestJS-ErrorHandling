
export function ErrorDecorator(bubble = true) {
  // const injectLogger = Inject(LoggerService);
  console.log('ErrorDecorator >>>>>>>>>>>>>>>>>>>>>>>>>>')
  return (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
    // injectLogger(target, 'logger'); // this is the same as using constructor(private readonly logger: LoggerService) in a class
    console.log('ErrorDecorator - target ', target)
    console.log('ErrorDecorator - target ', typeof target)
    console.log('ErrorDecorator - propertyKey ', propertyKey)
    console.log('ErrorDecorator - propertyDescriptor ', propertyDescriptor)
    //get original method
    const originalMethod = propertyDescriptor.value;

    //redefine descriptor value within own function block
    propertyDescriptor.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      }
      catch (error) {

        console.log('ErrorDecorator - args ', args)
        console.log('ErrorDecorator - error ', error)
        // const logger: LoggerService = this.logger;

        // logger.setContext(target.constructor.name);
        // logger.error(error.message, error.stack);

        // rethrow error, so it can bubble up
        if (bubble) {
          throw error;
        }
      }
    };
  };
}