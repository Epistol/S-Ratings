/* eslint-disable camelcase */

import Movie from './movie'
import { TvShow } from './tv-show'

export default interface Person {
  id: number;
  name: string;
  profile_path: string;
  adult: boolean;
  popularity: number;
  known_for: Array<Movie | TvShow>;
}
