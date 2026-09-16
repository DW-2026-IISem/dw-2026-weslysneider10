import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Verificar que la API está viva' })
  check() {
    return {
      status: 'ok',
      service: 'PuntoStock API',
      timestamp: new Date().toISOString(),
    };
  }
}
