import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ContributionService } from '../services/contribution.service';
import {
  CreateContributionDto,
  UpdateContributionDto,
} from '../dto/contribution.dto';
import { Contribution } from '../entities/contribution.entity';

@Controller('contributions')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  // POST /contributions
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createContributionDto: CreateContributionDto,
  ): Promise<Contribution> {
    return this.contributionService.create(createContributionDto);
  }

  // GET /contributions
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: any): Promise<Contribution[]> {
    const { type } = query;
    return this.contributionService.findAll(type);
  }

  // GET /contributions/:id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Contribution> {
    return this.contributionService.findById(id);
  }

  // PUT /contributions/:id
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContributionDto: UpdateContributionDto,
  ): Promise<Contribution> {
    return this.contributionService.update(id, updateContributionDto);
  }

  // DELETE /contributions/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.contributionService.remove(id);
  }
}
