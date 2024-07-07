import { DataSource, FindManyOptions, Like, Repository } from "typeorm";
import { getDataSource } from "../../data-source";
import { ParamsDto } from "../../dtos/ParamsDto";
import { ActiveParamsDto } from "../../dtos/ActiveParamsDto";
import { DeleteParamsDto } from "../../dtos/DeleteParamsDto";
import { PreguntaFrecuente } from "../../entity/servicios/PreguntaFrecuente";
import { PreguntaFrecuenteDto } from "../../dtos/servicios/PreguntaFrecuenteDto";
import { CategoriasPreguntasFrecuentes } from "../../entity/servicios/Categoria_pregunta_frecuente";
import { PostBiblioteca } from "../../entity/servicios/PostBiblioteca";
import { CategoriaPost } from "../../entity/servicios/Categoria_post";
import { PostDto } from "../../dtos/servicios/PostDto";

export class BibliotecaDigitalService {
  private repository: Repository<PostBiblioteca>;
  private categoriaRepository: Repository<CategoriaPost>;

  constructor() {
    const ds: DataSource = getDataSource();
    this.repository = ds.manager.getRepository(PostBiblioteca);
    this.categoriaRepository = ds.manager.getRepository(CategoriaPost);
  }
  public async getAll(p: ParamsDto) {
    const where: FindManyOptions<PostBiblioteca>["where"] = {};
    where.deletedAt != null;
    if (p.input) {
      where.descripcion = Like(`%${p.input}%`);
    }

    if (p.estado !== null) {
      where.estado = p.estado;
    }

    where.categoria = { id: p.categoriaId };

    const order: FindManyOptions<PostBiblioteca>["order"] = {};
    if (p.orderBy) {
      order[p.orderBy] = p.orderDirection || "ASC";
    }
    const options: any = {
      where,
      order,
      take: p.limit,
      skip: p.offset,
      relations: ["categoria"],
    };

    const [data, total] = await this.repository.findAndCount(options);

    const postDto = data.map((post) => new PostDto(post));

    return { data: postDto, total };
  }
  public async getAllCategorias() {
    const categorias = await this.categoriaRepository.find();
    return categorias;
  }
  public async create(p: PostDto): Promise<PostBiblioteca> {
    const post = new PostBiblioteca();
    post.archivo = p.archivo;
    post.fecha = p.fecha;
    post.descripcion = p.descripcion;
    if (p.categoria) {
      const categoria = await this.categoriaRepository.findOneBy({
        id: p.categoria.id,
      });
      console.log(p.categoria);
      console.log(categoria);
      if (categoria) {
        post.categoria = categoria;
      } else {
        throw new Error(`No se encontró la categoría con ID ${p.categoria}`);
      }
    }

    const postGuardada = await this.repository.save(post);
    return postGuardada;
  }

  public async update(p: PostDto): Promise<PostBiblioteca | null> {
    const postExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!postExistente) {
      return null;
    }
    postExistente.fecha = p.fecha;
    postExistente.descripcion = p.descripcion;
    if (p.categoria) {
      const category = await this.categoriaRepository.findOneBy({
        id: p.categoria.id,
      });
      postExistente.categoria = category;
    }

    postExistente.updatedAt = new Date();

    const postActualizado = await this.repository.save(postExistente);
    return postActualizado;
  }
  public async setState(p: ActiveParamsDto): Promise<PostBiblioteca | null> {
    const PostExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!PostExistente) {
      return null;
    }
    PostExistente.estado = p.estado;
    PostExistente.updatedAt = p.updatedAt;

    const postActualizado = await this.repository.save(PostExistente);
    return postActualizado;
  }
  public async delete(p: DeleteParamsDto): Promise<void> {
    const PostExistente = await this.repository.findOneBy({
      id: p.id,
    });
    if (!PostExistente) {
      return null;
    }
    PostExistente.deletedAt = p.deletedAt;
    PostExistente.updatedAt = p.deletedAt;
    await this.repository.save(PostExistente);
  }
}
