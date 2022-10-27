import { Pipe, PipeTransform } from '@angular/core';
import {Post} from "../shared/interfaces";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: Post[], search: string = ''): Post[] | [] {
    if(!search.trim()) {
      return posts
    }
    return posts.filter((item) => {
      return item.author.toLowerCase().includes(search.toLowerCase())
    });
  }

}
