import { PrismaClient } from "../../generated/prisma/client";

const prisma = new PrismaClient({
    datasourceUrl: `file:${process.cwd()}/prisma/dev.db`,
});

export async function getPhotographers() {
    return await prisma.photographer.findMany();
}

export async function getPhotographerById(id: number) {
    return await prisma.photographer.findUnique({
        where: { id }
    });
}

export async function getMediasByPhotographerId(id: number) {
  return await prisma.media.findMany({
    where: {
      photographerId: id,
    },
  });
}

export async function addLike(mediaId: number) {
  return await prisma.media.update({
    where: {
      id: mediaId,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
}