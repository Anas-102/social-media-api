import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { info } from 'console';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
import { LoginDTO } from 'src/users/dtos/Login.dto';
import { UpdateUserDTO } from 'src/users/dtos/UpdateUser.dto';
import { SearchUserDTO } from 'src/users/dtos/searchUser.dto';
import { UserService } from 'src/users/services/user/user.service';


@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api')
  fetchUsers() {
    return this.userService.fetchUsers();
  }

  @Post('userProfile')
  fetchUserProfiles(@Body() details: SearchUserDTO) {
    const username=details.username
    return this.userService.fetchUserProfiles(username);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get('myProfile')
  fetchProfile(@Req() request) {
    const user = request.user.sub as number;
    return this.userService.fetchProfile(user);
  }

  @Post('signup')
  createUser(@Body() details: CreateUserDTO) {
    return this.userService.createUser(details);
  }
  @Post('login')
  userLogin(@Body() credentials: LoginDTO) {
    return this.userService.userLogin(credentials);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Put('update')
  updateUser(@Req() request, @Body() details: UpdateUserDTO) {
    const user = request.user.sub as number;
    return this.userService.updateUser(user, { ...details });
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Delete('remove')
  deleteUser(@Req() request) {
    const user = request.user.sub as number;
    return this.userService.deleteUser(user);
  }
}
