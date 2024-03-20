import { AllowAnonymous } from '@/api/middlewares/auth-guard.strategy';
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

@Controller()
export class HealthController {
  getStatus() {
    return { status: 'Healthy' };
  }

  @AllowAnonymous()
  @Get('/hc')
  @ApiExcludeEndpoint()
  @HealthCheck()
  public async check() {
    return this.getStatus();
  }

  @AllowAnonymous()
  @Get('/liveness')
  @ApiExcludeEndpoint()
  @HealthCheck()
  public async liveness() {
    return this.getStatus();
  }
}
