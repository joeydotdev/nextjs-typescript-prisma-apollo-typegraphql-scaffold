import 'reflect-metadata';
import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { Artist } from '../../../graphql/generated/type-graphql';
import { type ResolverContextType } from '../../graphql/resolvers';

@Resolver(of => Artist)
class ArtistResolver {
  @Query(returns => Artist, { nullable: true })
  async getArtistById(
    @Ctx() ctx: ResolverContextType,
    @Arg('id', type => String, { nullable: true, defaultValue: '' })
    id: string,
  ) {
    if (id.length === 0) {
      throw new Error('nil id');
    }

    return ctx.prisma.artist.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
  }
}

export const resolver = [ArtistResolver];
