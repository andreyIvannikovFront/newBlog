import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "./interfaces";
import {map, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private http: HttpClient) {
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${environment.fbUrl}/posts.json`, post)
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbUrl}/posts/${id}.json`)
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbUrl}/posts/${id}.json`).pipe(
      map((post) => {
        return {
          ...post,
          id
        }
      })
    )
  }

  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbUrl}/posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          const keysObject = Object.keys(response)
          return keysObject.map((key: string) => {
            return {
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }
          })
        }))
  }

  update(post: Post): Observable<Post> {
    console.log(post)
    return this.http.patch<Post>(`${environment.fbUrl}/posts/${post.id}.json`, post)
  }
}
