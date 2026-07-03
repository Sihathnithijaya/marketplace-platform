import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Reject requests with unexpected fields, strip/validate input automatically.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Allow the Next.js frontend (running on a different port) to call this API.
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3000",
    credentials: true,
  });

  const port = process.env.API_PORT ?? 4000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}`);
}

bootstrap();
