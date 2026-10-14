import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service.js';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guard/roles.guard.js';
import { roles } from '../auth/decorators/roles.decorator.js';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@roles('admin')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @Get('stats')
  getStats() {
    return this.dashboardService.getStats();
  }
}