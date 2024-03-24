import { Movie, Genre, SearchParams, SearchResults, OrderBy, Direction } from './models';
import { MovieService } from './services';

export const searchMovies = async (params: SearchParams): Promise<SearchResults> => {
  try {
    const { query = '', genre = [], limit = 12, offset = 0, orderBy = 'title', direction = 'ASC' } = params;
    let movies: Movie[] = await MovieService.getMovies();

    movies = filterM(movies, query, genre);
    movies = sortM(movies, orderBy, direction);

    const total: number = movies.length;
    const slicedMovies: Movie[] = paginateMovies(movies, offset, limit);

    return { total, movies: slicedMovies };
  } catch (error) {
    return { total: 0, movies: [] };
  }
};

const filterM = (movies: Movie[], query: string, genre: Genre[]): Movie[] => {
  return movies.filter(movie =>
    (query === '' || movie.title.toLowerCase().includes(query.toLowerCase()) ||
    (movie.overview && movie.overview.toLowerCase().includes(query.toLowerCase()))) &&
    (genre.length === 0 || movie.genres !== undefined && movie.genres.some(g => genre.includes(g)))
  );
};

const sortM = (movies: Movie[], orderBy: OrderBy, direction: Direction): Movie[] => {
  return movies.sort((movie1, movie2) => {

    if (orderBy === 'title') {
      return direction === 'ASC' ? movie1.title.localeCompare(movie2.title) : movie2.title.localeCompare(movie1.title);
    }

    if (orderBy === 'release_date'){
      return direction === 'ASC' ? new Date(movie1.release_date).getTime() - new Date(movie2.release_date).getTime() :
       new Date(movie2.release_date).getTime() - new Date(movie1.release_date).getTime();
    }
    
    if(orderBy === 'vote_average'){
      return direction === "ASC" ? (movie1.vote_average ?? 0) - (movie2.vote_average ?? 0) :
       (movie2.vote_average ?? 0) - (movie1.vote_average ?? 0);
    }
    
    const valueA: any = movie1[orderBy];
    const valueB: any = movie2[orderBy];
    
    return direction === 'ASC' ? valueA - valueB : valueB - valueA;
   
  });
  
};

const paginateMovies = (movies: Movie[], offset: number, limit: number): Movie[] => {
  return movies.slice(offset, offset + limit);
};