import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        throw new BadRequestException({
          // statusCode: 400,
          message: 'Erro de validação',
          errors: formattedErrors,
        });
      }
      throw new BadRequestException({
        // statusCode: 400,
        message: 'Erro de validação',
        errors: [{ message: JSON.stringify(error) }],
      });
    }
  }
}