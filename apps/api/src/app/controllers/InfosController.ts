import { Get, JsonController } from 'routing-controllers';
import { Glyphwiki } from '../services/Glyphwiki';

@JsonController()
export class InfosController {
  @Get('/infos')
  async index() {
    return {
      infos: {
        glyphwikiAccessible: await Glyphwiki.health(),
      },
    };
  }
}
