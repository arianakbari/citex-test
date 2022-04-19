import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { OwnerGuard } from 'src/guards/owner.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { IUser } from './users.entity';
import { CurrentUserResponseDto } from './dtos/current-user-response.dto';
import { UsersService } from './users.service';
import { UpdateUserRequestDto } from './dtos/update-user-request.dto';

@Controller('user')
@UseGuards(AuthGuard, OwnerGuard)
export class UsersController {
  constructor(private usersSerivce: UsersService) {}

  @Get(':userId')
  @Serialize(CurrentUserResponseDto)
  whoAmI(@CurrentUser() user: IUser) {
    return user;
  }

  @Patch(':userId')
  @Serialize(CurrentUserResponseDto)
  updateUser(@Param('userId') id: string, @Body() data: UpdateUserRequestDto) {
    return this.usersSerivce.update(parseInt(id), data);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') id: string) {
    await this.usersSerivce.remove(parseInt(id));
  }
}
