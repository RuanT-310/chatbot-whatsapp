import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import hbs from 'hbs';
async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  
  const port = configService.get<number>("PORT", 3000)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  // Helper para comparar valores (ex: status === 'pending')
  hbs.registerHelper('statusBadge', function(status: string) {
  const map = {
    pending: 'bg-warning text-dark',
    confirmed: 'bg-primary',
    delivered: 'bg-success',
    cancelled: 'bg-danger'
  };
  return map[status] || 'bg-secondary';
});

  // 2. Helper para as cores do Status de Pagamento (O QUE ESTAVA FALTANDO)
  hbs.registerHelper('paymentBadge', function(status: string) {
    const map = {
      pending: 'bg-danger',
      paid: 'bg-success',
      refunded: 'bg-info text-dark'
    };
    return map[status] || 'bg-secondary';
  });

  // 3. Helper para comparação lógica (usado no #ifEquals)
  hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  // 4. Helper para calcular estoque disponível no select
  hbs.registerHelper('subtract', (a: number, b: number) => (a - b).toFixed(1));

  //5. Helper para multiplicação (preço total por item)
  hbs.registerHelper('multiply', (a: number, b: number) => {
  return (a * b).toFixed(2);
});
  await app.listen(port);
}
bootstrap();
