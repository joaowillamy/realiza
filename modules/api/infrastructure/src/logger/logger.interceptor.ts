import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, Request } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest());
    return next.handle();
  }

  private log(req: { body: any; method: any; route: { path: any }; query: any; params: any; ip: any }) {
    const body = { ...req.body };
    delete body.password;
    delete body.passwordConfirmation;
    const user = (req as any).user;
    const userEmail = user ? user.email : null;

    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      route: req.route.path,
      data: {
        body: body,
        query: req.query,
        params: req.params,
      },
      from: req.ip,
      madeBy: userEmail,
    };

    this.logger.info(`${log.method} - ${log.route} \n`, log);
  }
}
